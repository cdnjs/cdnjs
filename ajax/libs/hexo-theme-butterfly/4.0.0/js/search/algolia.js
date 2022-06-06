window.addEventListener('load', () => {
  const openSearch = () => {
    const bodyStyle = document.body.style
    bodyStyle.width = '100%'
    bodyStyle.overflow = 'hidden'
    btf.animateIn(document.getElementById('search-mask'), 'to_show 0.5s')
    btf.animateIn(document.querySelector('#algolia-search .search-dialog'), 'titleScale 0.5s')
    setTimeout(() => { document.querySelector('#algolia-search .ais-SearchBox-input').focus() }, 100)

    // shortcut: ESC
    document.addEventListener('keydown', function f (event) {
      if (event.code === 'Escape') {
        closeSearch()
        document.removeEventListener('keydown', f)
      }
    })
  }

  const closeSearch = () => {
    const bodyStyle = document.body.style
    bodyStyle.width = ''
    bodyStyle.overflow = ''
    btf.animateOut(document.querySelector('#algolia-search .search-dialog'), 'search_close .5s')
    btf.animateOut(document.getElementById('search-mask'), 'to_hide 0.5s')
  }

  const searchClickFn = () => {
    document.querySelector('#search-button > .search').addEventListener('click', openSearch)
    document.getElementById('search-mask').addEventListener('click', closeSearch)
    document.querySelector('#algolia-search .search-close-button').addEventListener('click', closeSearch)
  }

  searchClickFn()

  window.addEventListener('pjax:complete', function () {
    getComputedStyle(document.querySelector('#algolia-search .search-dialog')).display === 'block' && closeSearch()
    searchClickFn()
  })

  const algolia = GLOBAL_CONFIG.algolia
  const isAlgoliaValid = algolia.appId && algolia.apiKey && algolia.indexName
  if (!isAlgoliaValid) {
    return console.error('Algolia setting is invalid!')
  }

  const searchClient = window.algoliasearch(algolia.appId, algolia.apiKey)
  const search = instantsearch({
    indexName: algolia.indexName,
    searchClient
  })

  search.addWidgets([
    instantsearch.widgets.configure({
      hitsPerPage: 5
    })
  ])

  search.addWidgets([
    instantsearch.widgets.searchBox({
      container: '#algolia-search-input',
      showReset: false,
      showSubmit: false,
      placeholder: GLOBAL_CONFIG.algolia.languages.input_placeholder,
      showLoadingIndicator: true
    })
  ])

  search.addWidgets([
    instantsearch.widgets.hits({
      container: '#algolia-hits',
      templates: {
        item: function (data) {
          const link = data.permalink ? data.permalink : (GLOBAL_CONFIG.root + data.path)
          return `
            <a href="${link}" class="algolia-hit-item-link">
            ${data._highlightResult.title.value || 'no-title'}
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
  ])

  search.addWidgets([
    instantsearch.widgets.stats({
      container: '#algolia-stats',
      templates: {
        text: function (data) {
          const icon = '<svg viewBox="0 0 1366 362" xmlns="http://www.w3.org/2000/svg"><linearGradient id="a" x1="428.26" x2="434.14" y1="404.15" y2="409.85" gradientTransform="matrix(94.045 0 0 -94.072 -40382 38480)" gradientUnits="userSpaceOnUse"><stop stop-color="#00aeff" offset="0"/><stop stop-color="#3369e7" offset="1"/></linearGradient><path d="M61.8 15.4h242.8c23.9 0 43.4 19.4 43.4 43.4v242.9c0 23.9-19.4 43.4-43.4 43.4H61.8c-23.9 0-43.4-19.4-43.4-43.4v-243c0-23.9 19.4-43.3 43.4-43.3z" fill="url(#a)"/><path d="M187 98.7c-51.4 0-93.1 41.7-93.1 93.2S135.6 285 187 285s93.1-41.7 93.1-93.2-41.6-93.1-93.1-93.1zm0 158.8c-36.2 0-65.6-29.4-65.6-65.6s29.4-65.6 65.6-65.6 65.6 29.4 65.6 65.6-29.3 65.6-65.6 65.6zm0-117.8v48.9c0 1.4 1.5 2.4 2.8 1.7l43.4-22.5c1-.5 1.3-1.7.8-2.7-9-15.8-25.7-26.6-45-27.3-1 0-2 .8-2 1.9zm-60.8-35.9l-5.7-5.7c-5.6-5.6-14.6-5.6-20.2 0l-6.8 6.8c-5.6 5.6-5.6 14.6 0 20.2l5.6 5.6c.9.9 2.2.7 3-.2 3.3-4.5 6.9-8.8 10.9-12.8 4.1-4.1 8.3-7.7 12.9-11 1-.6 1.1-2 .3-2.9zM217.5 89V77.7c0-7.9-6.4-14.3-14.3-14.3h-33.3c-7.9 0-14.3 6.4-14.3 14.3v11.6c0 1.3 1.2 2.2 2.5 1.9 9.3-2.7 19.1-4.1 29-4.1 9.5 0 18.9 1.3 28 3.8 1.2.3 2.4-.6 2.4-1.9z" fill="#FFF"/><path d="m842.5 267.6c0 26.7-6.8 46.2-20.5 58.6s-34.6 18.6-62.8 18.6c-10.3 0-31.7-2-48.8-5.8l6.3-31c14.3 3 33.2 3.8 43.1 3.8 15.7 0 26.9-3.2 33.6-9.6s10-15.9 10-28.5v-6.4c-3.9 1.9-9 3.8-15.3 5.8-6.3 1.9-13.6 2.9-21.8 2.9-10.8 0-20.6-1.7-29.5-5.1s-16.6-8.4-22.9-15-11.3-14.9-14.8-24.8-5.3-27.6-5.3-40.6c0-12.2 1.9-27.5 5.6-37.7 3.8-10.2 9.2-19 16.5-26.3 7.2-7.3 16-12.9 26.3-17s22.4-6.7 35.5-6.7c12.7 0 24.4 1.6 35.8 3.5s21.1 3.9 29 6.1v155.2zm-108.7-77.2c0 16.4 3.6 34.6 10.8 42.2s16.5 11.4 27.9 11.4c6.2 0 12.1-0.9 17.6-2.6s9.9-3.7 13.4-6.1v-97.1c-2.8-0.6-14.5-3-25.8-3.3-14.2-0.4-25 5.4-32.6 14.7-7.5 9.3-11.3 25.6-11.3 40.8zm294.3 0c0 13.2-1.9 23.2-5.8 34.1s-9.4 20.2-16.5 27.9-15.6 13.7-25.6 17.9-25.4 6.6-33.1 6.6c-7.7-0.1-23-2.3-32.9-6.6s-18.4-10.2-25.5-17.9-12.6-17-16.6-27.9-6-20.9-6-34.1 1.8-25.9 5.8-36.7 9.6-20 16.8-27.7 15.8-13.6 25.6-17.8c9.9-4.2 20.8-6.2 32.6-6.2s22.7 2.1 32.7 6.2c10 4.2 18.6 10.1 25.6 17.8 7.1 7.7 12.6 16.9 16.6 27.7 4.2 10.8 6.3 23.5 6.3 36.7zm-40 0.1c0-16.9-3.7-31-10.9-40.8-7.2-9.9-17.3-14.8-30.2-14.8s-23 4.9-30.2 14.8-10.7 23.9-10.7 40.8c0 17.1 3.6 28.6 10.8 38.5 7.2 10 17.3 14.9 30.2 14.9s23-5 30.2-14.9c7.2-10 10.8-21.4 10.8-38.5zm127.1 86.4c-64.1 0.3-64.1-51.8-64.1-60.1l-0.1-184.8 39.1-6.2v183.6c0 4.7 0 34.5 25.1 34.6v32.9zm68.9 0h-39.3v-168.8l39.3-6.2v175zm-19.7-193.5c13.1 0 23.8-10.6 23.8-23.7s-10.6-23.7-23.8-23.7-23.8 10.6-23.8 23.7 10.7 23.7 23.8 23.7zm117.4 18.6c12.9 0 23.8 1.6 32.6 4.8s15.9 7.7 21.1 13.4 8.9 13.5 11.1 21.7c2.3 8.2 3.4 17.2 3.4 27.1v100.6c-6 1.3-15.1 2.8-27.3 4.6s-25.9 2.7-41.1 2.7c-10.1 0-19.4-1-27.7-2.9-8.4-1.9-15.5-5-21.5-9.3-5.9-4.3-10.5-9.8-13.9-16.6-3.3-6.8-5-16.4-5-26.4 0-9.6 1.9-15.7 5.6-22.3 3.8-6.6 8.9-12 15.3-16.2 6.5-4.2 13.9-7.2 22.4-9s17.4-2.7 26.6-2.7c4.3 0 8.8 0.3 13.6 0.8s9.8 1.4 15.2 2.7v-6.4c0-4.5-0.5-8.8-1.6-12.8-1.1-4.1-3-7.6-5.6-10.7-2.7-3.1-6.2-5.5-10.6-7.2s-10-3-16.7-3c-9 0-17.2 1.1-24.7 2.4s-13.7 2.8-18.4 4.5l-4.7-32.1c4.9-1.7 12.2-3.4 21.6-5.1s19.5-2.6 30.3-2.6zm3.3 141.9c12 0 20.9-0.7 27.1-1.9v-39.8c-2.2-0.6-5.3-1.3-9.4-1.9s-8.6-1-13.6-1c-4.3 0-8.7 0.3-13.1 1-4.4 0.6-8.4 1.8-11.9 3.5s-6.4 4.1-8.5 7.2c-2.2 3.1-3.2 4.9-3.2 9.6 0 9.2 3.2 14.5 9 18 5.9 3.6 13.7 5.3 23.6 5.3zm-772.2-140.9c12.9 0 23.8 1.6 32.6 4.8s15.9 7.7 21.1 13.4c5.3 5.8 8.9 13.5 11.1 21.7 2.3 8.2 3.4 17.2 3.4 27.1v100.6c-6 1.3-15.1 2.8-27.3 4.6s-25.9 2.7-41.1 2.7c-10.1 0-19.4-1-27.7-2.9-8.4-1.9-15.5-5-21.5-9.3-5.9-4.3-10.5-9.8-13.9-16.6-3.3-6.8-5-16.4-5-26.4 0-9.6 1.9-15.7 5.6-22.3 3.8-6.6 8.9-12 15.3-16.2 6.5-4.2 13.9-7.2 22.4-9s17.4-2.7 26.6-2.7c4.3 0 8.8 0.3 13.6 0.8 4.7 0.5 9.8 1.4 15.2 2.7v-6.4c0-4.5-0.5-8.8-1.6-12.8-1.1-4.1-3-7.6-5.6-10.7-2.7-3.1-6.2-5.5-10.6-7.2s-10-3-16.7-3c-9 0-17.2 1.1-24.7 2.4s-13.7 2.8-18.4 4.5l-4.7-32.1c4.9-1.7 12.2-3.4 21.6-5.1 9.4-1.8 19.5-2.6 30.3-2.6zm3.4 142c12 0 20.9-0.7 27.1-1.9v-39.8c-2.2-0.6-5.3-1.3-9.4-1.9s-8.6-1-13.6-1c-4.3 0-8.7 0.3-13.1 1-4.4 0.6-8.4 1.8-11.9 3.5s-6.4 4.1-8.5 7.2c-2.2 3.1-3.2 4.9-3.2 9.6 0 9.2 3.2 14.5 9 18s13.7 5.3 23.6 5.3zm158.5 31.9c-64.1 0.3-64.1-51.8-64.1-60.1l-0.1-184.8 39.1-6.2v183.6c0 4.7 0 34.5 25.1 34.6v32.9z" fill="#182359"/></svg>'
          const stats = GLOBAL_CONFIG.algolia.languages.hits_stats
            .replace(/\$\{hits}/, data.nbHits)
            .replace(/\$\{time}/, data.processingTimeMS)
          return (
            `<hr>${stats}<span class="algolia-logo pull-right">${icon}</span>`
          )
        }
      }
    })
  ])

  search.addWidgets([
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
  ])
  search.start()

  window.pjax && search.on('render', () => {
    window.pjax.refresh(document.getElementById('algolia-hits'))
  })
})
