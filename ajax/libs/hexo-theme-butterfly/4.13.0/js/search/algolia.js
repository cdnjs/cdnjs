window.addEventListener('load', () => {
  const $searchMask = document.getElementById('search-mask')
  const $searchDialog = document.querySelector('#algolia-search .search-dialog')

  const openSearch = () => {
    const bodyStyle = document.body.style
    bodyStyle.width = '100%'
    bodyStyle.overflow = 'hidden'
    btf.animateIn($searchMask, 'to_show 0.5s')
    btf.animateIn($searchDialog, 'titleScale 0.5s')
    setTimeout(() => { document.querySelector('#algolia-search .ais-SearchBox-input').focus() }, 100)

    // shortcut: ESC
    document.addEventListener('keydown', function f (event) {
      if (event.code === 'Escape') {
        closeSearch()
        document.removeEventListener('keydown', f)
      }
    })

    fixSafariHeight()
    window.addEventListener('resize', fixSafariHeight)
  }

  const closeSearch = () => {
    const bodyStyle = document.body.style
    bodyStyle.width = ''
    bodyStyle.overflow = ''
    btf.animateOut($searchDialog, 'search_close .5s')
    btf.animateOut($searchMask, 'to_hide 0.5s')
    window.removeEventListener('resize', fixSafariHeight)
  }

  // fix safari
  const fixSafariHeight = () => {
    if (window.innerWidth < 768) {
      $searchDialog.style.setProperty('--search-height', window.innerHeight + 'px')
    }
  }

  const searchClickFn = () => {
    btf.addEventListenerPjax(document.querySelector('#search-button > .search'), 'click', openSearch)
  }

  const searchFnOnce = () => {
    $searchMask.addEventListener('click', closeSearch)
    document.querySelector('#algolia-search .search-close-button').addEventListener('click', closeSearch)
  }

  const cutContent = content => {
    if (content === '') return ''

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

    const matchContent = pre + content.substring(start, end) + post
    return matchContent
  }

  const algolia = GLOBAL_CONFIG.algolia
  const isAlgoliaValid = algolia.appId && algolia.apiKey && algolia.indexName
  if (!isAlgoliaValid) {
    return console.error('Algolia setting is invalid!')
  }

  const search = instantsearch({
    indexName: algolia.indexName,
    /* global algoliasearch */
    searchClient: algoliasearch(algolia.appId, algolia.apiKey),
    searchFunction (helper) {
      helper.state.query && helper.search()
    }
  })

  const configure = instantsearch.widgets.configure({
    hitsPerPage: 5
  })

  const searchBox = instantsearch.widgets.searchBox({
    container: '#algolia-search-input',
    showReset: false,
    showSubmit: false,
    placeholder: GLOBAL_CONFIG.algolia.languages.input_placeholder,
    showLoadingIndicator: true
  })

  const hits = instantsearch.widgets.hits({
    container: '#algolia-hits',
    templates: {
      item (data) {
        const link = data.permalink ? data.permalink : (GLOBAL_CONFIG.root + data.path)
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
          <p class="algolia-hit-item-content">${content}</p>
          </a>`
      },
      empty: function (data) {
        return (
          '<div id="algolia-hits-empty">' +
          GLOBAL_CONFIG.algolia.languages.hits_empty.replace(/\$\{query}/, data.query) +
          '</div>'
        )
      }
    }
  })

  const stats = instantsearch.widgets.stats({
    container: '#algolia-info > .algolia-stats',
    templates: {
      text: function (data) {
        const stats = GLOBAL_CONFIG.algolia.languages.hits_stats
          .replace(/\$\{hits}/, data.nbHits)
          .replace(/\$\{time}/, data.processingTimeMS)
        return (
          `<hr>${stats}`
        )
      }
    }
  })

  const powerBy = instantsearch.widgets.poweredBy({
    container: '#algolia-info > .algolia-poweredBy'
  })

  const pagination = instantsearch.widgets.pagination({
    container: '#algolia-pagination',
    totalPages: 5,
    templates: {
      first: '<i class="fas fa-angle-double-left"></i>',
      last: '<i class="fas fa-angle-double-right"></i>',
      previous: '<i class="fas fa-angle-left"></i>',
      next: '<i class="fas fa-angle-right"></i>'
    }
  })

  search.addWidgets([configure, searchBox, hits, stats, powerBy, pagination]) // add the widgets to the instantsearch instance

  search.start()

  searchClickFn()
  searchFnOnce()

  window.addEventListener('pjax:complete', () => {
    !btf.isHidden($searchMask) && closeSearch()
    searchClickFn()
  })

  window.pjax && search.on('render', () => {
    window.pjax.refresh(document.getElementById('algolia-hits'))
  })
})
