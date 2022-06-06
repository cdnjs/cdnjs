window.addEventListener('load', () => {
  let loadFlag = false
  const openSearch = function () {
    document.body.style.cssText = 'width: 100%;overflow: hidden'
    document.querySelector('#local-search .search-dialog').style.display = 'block'
    document.querySelector('#local-search-input input').focus()
    btf.fadeIn(document.getElementById('search-mask'), 0.5)
    if (!loadFlag) {
      search(GLOBAL_CONFIG.localSearch.path)
      loadFlag = true
    }
    // shortcut: ESC
    document.addEventListener('keydown', function f (event) {
      if (event.code === 'Escape') {
        closeSearch()
        document.removeEventListener('keydown', f)
      }
    })
  }

  const closeSearch = function () {
    document.body.style.cssText = "width: '';overflow: ''"
    const $searchDialog = document.querySelector('#local-search .search-dialog')
    $searchDialog.style.animation = 'search_close .5s'
    setTimeout(() => { $searchDialog.style.cssText = "display: none; animation: ''" }, 500)
    btf.fadeOut(document.getElementById('search-mask'), 0.5)
  }

  // click function
  const searchClickFn = () => {
    document.querySelector('#search-button > .search').addEventListener('click', openSearch)
    document.getElementById('search-mask').addEventListener('click', closeSearch)
    document.querySelector('#local-search .search-close-button').addEventListener('click', closeSearch)
  }

  searchClickFn()

  // pjax
  window.addEventListener('pjax:complete', function () {
    getComputedStyle(document.querySelector('#local-search .search-dialog')).display === 'block' && closeSearch()
    searchClickFn()
  })

  function search (path) {
    fetch(GLOBAL_CONFIG.root + path)
      .then(response => response.text())
      .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
      .then(data => {
        const datas = [...data.querySelectorAll('entry')].map(function (item) {
          const content = item.querySelector('content')
          return {
            title: item.querySelector('title').textContent,
            content: content ? content.textContent : '',
            url: item.querySelector('url').textContent
          }
        })

        const $input = document.querySelector('#local-search-input input')
        const $resultContent = document.getElementById('local-search-results')
        $input.addEventListener('input', function () {
          let str = '<div class="search-result-list">'
          const keywords = this.value.trim().toLowerCase().split(/[\s]+/)
          $resultContent.innerHTML = ''
          if (this.value.trim().length <= 0) return
          let count = 0
          // perform local searching
          datas.forEach(function (data) {
            let isMatch = true
            if (!data.title || data.title.trim() === '') {
              data.title = 'Untitled'
            }
            let dataTitle = data.title.trim().toLowerCase()
            const dataContent = data.content.trim().replace(/<[^>]+>/g, '').toLowerCase()
            const dataUrl = data.url.startsWith('/') ? data.url : GLOBAL_CONFIG.root + data.url
            let indexTitle = -1
            let indexContent = -1
            let firstOccur = -1
            // only match artiles with not empty titles and contents
            if (dataTitle !== '' || dataContent !== '') {
              keywords.forEach(function (keyword, i) {
                indexTitle = dataTitle.indexOf(keyword)
                indexContent = dataContent.indexOf(keyword)
                if (indexTitle < 0 && indexContent < 0) {
                  isMatch = false
                } else {
                  if (indexContent < 0) {
                    indexContent = 0
                  }
                  if (i === 0) {
                    firstOccur = indexContent
                  }
                }
              })
            } else {
              isMatch = false
            }

            // show search results
            if (isMatch) {
              const content = data.content.trim().replace(/<[^>]+>/g, '')
              if (firstOccur >= 0) {
                // cut out 130 characters
                let start = firstOccur - 30
                let end = firstOccur + 100

                if (start < 0) {
                  start = 0
                }

                if (start === 0) {
                  end = 100
                }

                if (end > content.length) {
                  end = content.length
                }

                let matchContent = content.substring(start, end)

                // highlight all keywords
                keywords.forEach(function (keyword) {
                  const regS = new RegExp(keyword, 'gi')
                  matchContent = matchContent.replace(regS, '<span class="search-keyword">' + keyword + '</span>')
                  dataTitle = dataTitle.replace(regS, '<span class="search-keyword">' + keyword + '</span>')
                })

                str += '<div class="local-search__hit-item"><a href="' + dataUrl + '" class="search-result-title">' + dataTitle + '</a>'
                count += 1

                if (dataContent !== '') {
                  str += '<p class="search-result">' + matchContent + '...</p>'
                }
              }
              str += '</div>'
            }
          })
          if (count === 0) {
            str += '<div id="local-search__hits-empty">' + GLOBAL_CONFIG.localSearch.languages.hits_empty.replace(/\$\{query}/, this.value.trim()) +
              '</div>'
          }
          str += '</div>'
          $resultContent.innerHTML = str
          window.pjax && window.pjax.refresh($resultContent)
        })
      })
  }
})
