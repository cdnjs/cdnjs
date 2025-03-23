export default function initLocalSearch() {
  // Search DB path
  let searchPath = config.path;
  if (!searchPath) {
    // Search DB path
    console.warn("`hexo-generator-searchdb` plugin is not installed!");
    return;
  }

  // Popup Window
  let isfetched = false;
  let datas;
  let isXml = true;
  if (searchPath.length === 0) {
    searchPath = "search.xml";
  } else if (searchPath.endsWith("json")) {
    isXml = false;
  }
  const searchInputDom = document.querySelector(".search-input");
  const resultContent = document.getElementById("search-result");

  const getIndexByWord = (word, text, caseSensitive) => {
    let wordLen = word.length;
    if (wordLen === 0) return [];
    let startPosition = 0;
    let position = [];
    let index = [];
    if (!caseSensitive) {
      text = text.toLowerCase();
      word = word.toLowerCase();
    }
    while ((position = text.indexOf(word, startPosition)) > -1) {
      index.push({ position, word });
      startPosition = position + wordLen;
    }
    return index;
  };

  // Merge hits into slices
  const mergeIntoSlice = (start, end, index, searchText) => {
    let currentItem = index[index.length - 1];
    let { position, word } = currentItem;
    let hits = [];
    let searchTextCountInSlice = 0;

    // Merge hits into the slice
    while (position + word.length <= end && index.length !== 0) {
      if (word === searchText) {
        searchTextCountInSlice++;
      }
      hits.push({
        position,
        length: word.length,
      });

      const wordEnd = position + word.length;

      // Move to the next position of the hit
      index.pop();
      for (let i = index.length - 1; i >= 0; i--) {
        currentItem = index[i];
        position = currentItem.position;
        word = currentItem.word;
        if (wordEnd <= position) {
          break;
        } else {
          index.pop();
        }
      }
    }

    return {
      hits,
      start,
      end,
      searchTextCount: searchTextCountInSlice,
    };
  };

  // Highlight title and content
  const highlightKeyword = (text, slice) => {
    let result = "";
    let prevEnd = slice.start;
    slice.hits.forEach((hit) => {
      result += text.substring(prevEnd, hit.position);
      let end = hit.position + hit.length;
      result += `<b class="search-keyword">${text.substring(
        hit.position,
        end,
      )}</b>`;
      prevEnd = end;
    });
    result += text.substring(prevEnd, slice.end);
    return result;
  };

  const inputEventFunction = () => {
    if (!isfetched) return;
    let searchText = searchInputDom.value.trim().toLowerCase();
    let keywords = searchText.split(/[-\s]+/);
    if (keywords.length > 1) {
      keywords.push(searchText);
    }
    let resultItems = [];
    if (searchText.length > 0) {
      // Perform local searching
      datas.forEach(({ title, content, url }) => {
        let titleInLowerCase = title.toLowerCase();
        let contentInLowerCase = content.toLowerCase();
        let indexOfTitle = [];
        let indexOfContent = [];
        let searchTextCount = 0;
        keywords.forEach((keyword) => {
          indexOfTitle = indexOfTitle.concat(
            getIndexByWord(keyword, titleInLowerCase, false),
          );
          indexOfContent = indexOfContent.concat(
            getIndexByWord(keyword, contentInLowerCase, false),
          );
        });

        // Show search results
        if (indexOfTitle.length > 0 || indexOfContent.length > 0) {
          let hitCount = indexOfTitle.length + indexOfContent.length;
          // Sort index by position of keyword
          [indexOfTitle, indexOfContent].forEach((index) => {
            index.sort((itemLeft, itemRight) => {
              if (itemRight.position !== itemLeft.position) {
                return itemRight.position - itemLeft.position;
              }
              return itemLeft.word.length - itemRight.word.length;
            });
          });

          let slicesOfTitle = [];
          if (indexOfTitle.length !== 0) {
            let tmp = mergeIntoSlice(0, title.length, indexOfTitle, searchText);
            searchTextCount += tmp.searchTextCountInSlice;
            slicesOfTitle.push(tmp);
          }

          let slicesOfContent = [];
          while (indexOfContent.length !== 0) {
            let item = indexOfContent[indexOfContent.length - 1];
            let { position, word } = item;
            // Cut out 100 characters
            let start = position - 20;
            let end = position + 80;
            if (start < 0) {
              start = 0;
            }
            if (end < position + word.length) {
              end = position + word.length;
            }
            if (end > content.length) {
              end = content.length;
            }
            let tmp = mergeIntoSlice(start, end, indexOfContent, searchText);
            searchTextCount += tmp.searchTextCountInSlice;
            slicesOfContent.push(tmp);
          }

          // Sort slices in content by search text's count and hits' count
          slicesOfContent.sort((sliceLeft, sliceRight) => {
            if (sliceLeft.searchTextCount !== sliceRight.searchTextCount) {
              return sliceRight.searchTextCount - sliceLeft.searchTextCount;
            } else if (sliceLeft.hits.length !== sliceRight.hits.length) {
              return sliceRight.hits.length - sliceLeft.hits.length;
            }
            return sliceLeft.start - sliceRight.start;
          });

          // Select top N slices in content
          let upperBound = parseInt(
            theme.navbar.search.top_n_per_article
              ? theme.navbar.search.top_n_per_article
              : 1,
            10,
          );
          if (upperBound >= 0) {
            slicesOfContent = slicesOfContent.slice(0, upperBound);
          }

          let resultItem = "";

          if (slicesOfTitle.length !== 0) {
            resultItem += `<li><a href="${url}" class="search-result-title">${highlightKeyword(
              title,
              slicesOfTitle[0],
            )}</a>`;
          } else {
            resultItem += `<li><a href="${url}" class="search-result-title">${title}</a>`;
          }

          slicesOfContent.forEach((slice) => {
            resultItem += `<a href="${url}"><p class="search-result">${highlightKeyword(
              content,
              slice,
            )}...</p></a>`;
          });

          resultItem += "</li>";
          resultItems.push({
            item: resultItem,
            id: resultItems.length,
            hitCount,
            searchTextCount,
          });
        }
      });
    }
    if (keywords.length === 1 && keywords[0] === "") {
      resultContent.innerHTML =
        '<div id="no-result"><i class="fa-solid fa-magnifying-glass fa-5x"></i></div>';
    } else if (resultItems.length === 0) {
      resultContent.innerHTML =
        '<div id="no-result"><i class="fa-solid fa-box-open fa-5x"></i></div>';
    } else {
      resultItems.sort((resultLeft, resultRight) => {
        if (resultLeft.searchTextCount !== resultRight.searchTextCount) {
          return resultRight.searchTextCount - resultLeft.searchTextCount;
        } else if (resultLeft.hitCount !== resultRight.hitCount) {
          return resultRight.hitCount - resultLeft.hitCount;
        }
        return resultRight.id - resultLeft.id;
      });
      let searchResultList = '<ul class="search-result-list">';
      resultItems.forEach((result) => {
        searchResultList += result.item;
      });
      searchResultList += "</ul>";
      resultContent.innerHTML = searchResultList;
      window.pjax && window.pjax.refresh(resultContent);
    }
  };

  const fetchData = () => {
    fetch(config.root + searchPath)
      .then((response) => response.text())
      .then((res) => {
        // Get the contents from search data
        isfetched = true;
        datas = isXml
          ? [
              ...new DOMParser()
                .parseFromString(res, "text/xml")
                .querySelectorAll("entry"),
            ].map((element) => {
              return {
                title: element.querySelector("title").textContent,
                content: element.querySelector("content").textContent,
                url: element.querySelector("url").textContent,
              };
            })
          : JSON.parse(res);
        // Only match articles with not empty titles
        datas = datas
          .filter((data) => data.title)
          .map((data) => {
            data.title = data.title.trim();
            data.content = data.content
              ? data.content.trim().replace(/<[^>]+>/g, "")
              : "";
            data.url = decodeURIComponent(data.url).replace(/\/{2,}/g, "/");
            return data;
          });
        // Remove loading animation
        const noResultDom = document.querySelector("#no-result");
        noResultDom &&
          (noResultDom.innerHTML =
            '<i class="fa-solid fa-magnifying-glass fa-5x"></i>');
      });
  };

  if (theme.navbar.search.preload) {
    fetchData();
  }

  if (searchInputDom) {
    searchInputDom.addEventListener("input", inputEventFunction);
  }

  // Handle and trigger popup window
  document.querySelectorAll(".search-popup-trigger").forEach((element) => {
    element.addEventListener("click", () => {
      document.body.style.overflow = "hidden";
      document.querySelector(".search-pop-overlay").classList.add("active");
      setTimeout(() => searchInputDom.focus(), 500);
      if (!isfetched) fetchData();
    });
  });

  // Monitor main search box
  const onPopupClose = () => {
    document.body.style.overflow = "";
    document.querySelector(".search-pop-overlay").classList.remove("active");
  };

  document
    .querySelector(".search-pop-overlay")
    .addEventListener("click", (event) => {
      if (event.target === document.querySelector(".search-pop-overlay")) {
        onPopupClose();
      }
    });
  document
    .querySelector(".search-input-field-pre")
    .addEventListener("click", () => {
      searchInputDom.value = "";
      searchInputDom.focus();
      inputEventFunction();
    });
  document
    .querySelector(".popup-btn-close")
    .addEventListener("click", onPopupClose);
  try {
    swup.hooks.on("page:view", (visit) => {
      onPopupClose();
    });
  } catch (e) {}

  window.addEventListener("keyup", (event) => {
    if (event.key === "Escape") {
      onPopupClose();
    }
  });
}
