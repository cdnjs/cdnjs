window.addEventListener('load', () => {
  const { algolia } = GLOBAL_CONFIG
  const { appId, apiKey, indexName, hitsPerPage = 5, languages } = algolia

  if (!appId || !apiKey || !indexName) {
    return console.error('Algolia setting is invalid!')
  }

  const $searchMask = document.getElementById('search-mask')
  const $searchDialog = document.querySelector('#algolia-search .search-dialog')

  const animateElements = show => {
    const action = show ? 'animateIn' : 'animateOut'
    const maskAnimation = show ? 'to_show 0.5s' : 'to_hide 0.5s'
    const dialogAnimation = show ? 'titleScale 0.5s' : 'search_close .5s'
    btf[action]($searchMask, maskAnimation)
    btf[action]($searchDialog, dialogAnimation)
  }

  const fixSafariHeight = () => {
    if (window.innerWidth < 768) {
      $searchDialog.style.setProperty('--search-height', `${window.innerHeight}px`)
    }
  }

  const openSearch = () => {
    btf.overflowPaddingR.add()
    animateElements(true)
    setTimeout(() => { document.querySelector('#algolia-search .ais-SearchBox-input').focus() }, 100)

    const handleEscape = event => {
      if (event.code === 'Escape') {
        closeSearch()
        document.removeEventListener('keydown', handleEscape)
      }
    }

    document.addEventListener('keydown', handleEscape)
    fixSafariHeight()
    window.addEventListener('resize', fixSafariHeight)
  }

  const closeSearch = () => {
    btf.overflowPaddingR.remove()
    animateElements(false)
    window.removeEventListener('resize', fixSafariHeight)
  }

  const searchClickFn = () => {
    btf.addEventListenerPjax(document.querySelector('#search-button > .search'), 'click', openSearch)
  }

  const searchFnOnce = () => {
    $searchMask.addEventListener('click', closeSearch)
    document.querySelector('#algolia-search .search-close-button').addEventListener('click', closeSearch)
  }

  const cutContent = (content) => {
    if (!content) return ''
    const firstOccur = content.indexOf('<mark>')
    let start = firstOccur - 30
    let end = firstOccur + 120
    let pre = ''
    let post = ''

    if (start <= 0) {
      start = 0
      end = 140
    } else {
      pre = '...'
    }

    if (end > content.length) {
      end = content.length
    } else {
      post = '...'
    }

    return `${pre}${content.substring(start, end)}${post}`
  }

  const disableDiv = [
    document.getElementById('algolia-hits'),
    document.getElementById('algolia-pagination'),
    document.querySelector('#algolia-info .algolia-stats')
  ]

  const searchClient = typeof algoliasearch === 'function' ? algoliasearch : window['algoliasearch/lite'].liteClient
  const search = instantsearch({
    indexName,
    searchClient: searchClient(appId, apiKey),
    searchFunction (helper) {
      disableDiv.forEach(item => {
        item.style.display = helper.state.query ? '' : 'none'
      })
      if (helper.state.query) helper.search()
    }
  })

  const widgets = [
    instantsearch.widgets.configure({ hitsPerPage }),
    instantsearch.widgets.searchBox({
      container: '#algolia-search-input',
      showReset: false,
      showSubmit: false,
      placeholder: languages.input_placeholder,
      showLoadingIndicator: true
    }),
    instantsearch.widgets.hits({
      container: '#algolia-hits',
      templates: {
        item (data) {
          const link = data.permalink || (GLOBAL_CONFIG.root + data.path)
          const result = data._highlightResult
          const content = result.contentStripTruncate
            ? cutContent(result.contentStripTruncate.value)
            : result.contentStrip
              ? cutContent(result.contentStrip.value)
              : result.content
                ? cutContent(result.content.value)
                : ''
          return `
            <a href="${link}" class="algolia-hit-item-link">
              <span class="algolia-hits-item-title">${result.title.value || 'no-title'}</span>
              ${content ? `<div class="algolia-hit-item-content">${content}</div>` : ''}
            </a>`
        },
        empty (data) {
          return `<div id="algolia-hits-empty">${languages.hits_empty.replace(/\$\{query}/, data.query)}</div>`
        }
      }
    }),
    instantsearch.widgets.stats({
      container: '#algolia-info > .algolia-stats',
      templates: {
        text (data) {
          const stats = languages.hits_stats
            .replace(/\$\{hits}/, data.nbHits)
            .replace(/\$\{time}/, data.processingTimeMS)
          return `<hr>${stats}`
        }
      }
    }),
    instantsearch.widgets.poweredBy({
      container: '#algolia-info > .algolia-poweredBy'
    }),
    instantsearch.widgets.pagination({
      container: '#algolia-pagination',
      totalPages: 5,
      templates: {
        first: '<i class="fas fa-angle-double-left"></i>',
        last: '<i class="fas fa-angle-double-right"></i>',
        previous: '<i class="fas fa-angle-left"></i>',
        next: '<i class="fas fa-angle-right"></i>'
      }
    })
  ]

  search.addWidgets(widgets)
  search.start()
  searchClickFn()
  searchFnOnce()

  window.addEventListener('pjax:complete', () => {
    if (!btf.isHidden($searchMask)) closeSearch()
    searchClickFn()
  })

  if (window.pjax) {
    search.on('render', () => {
      window.pjax.refresh(document.getElementById('algolia-hits'))
    })
  }
})
