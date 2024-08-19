/* global KEEP */

KEEP.initCodeBlock = () => {
  if (KEEP.theme_config?.code_block?.tools?.enable === true) {
    KEEP.utils.initCodeBlockTools = () => {
      const { style: codeBlockStyle } = KEEP.theme_config?.code_block || {}
      const { style: codeBlockToolsStyle } = KEEP.theme_config?.code_block?.tools || {}

      const isMac = (codeBlockStyle || codeBlockToolsStyle || 'default') === 'mac'
      const foldedIconClassName = isMac ? 'fas fa-chevron-left' : 'fas fa-chevron-right'
      const {
        copy: copyLang,
        copied: copiedLang,
        fold: foldLang,
        folded: foldedLang
      } = KEEP.language_code_block
      const foldDom = `<span class="tool fold tooltip" data-tooltip-content="${foldLang}" data-tooltip-offset-y="-2px"><i class="fas fa-chevron-down"></i></span>`

      document.querySelectorAll('figure.highlight').forEach((element) => {
        // code language
        let codeLang = element.classList.length ? element.classList[1].toUpperCase() : ''
        if (codeLang === 'PLAINTEXT') {
          codeLang = ''
        }
        const highlightContainer = document.createElement('div')
        highlightContainer.classList.add('highlight-container')
        if (isMac) {
          highlightContainer.classList.add('mac')
        }
        element.wrap(highlightContainer)

        const codeLangDom = `${codeLang ? '<span class="code-lang">' + codeLang + '</span>' : ''}`

        // code tools
        highlightContainer.insertAdjacentHTML(
          'afterbegin',
          `<div class="code-tools-box">
        ${isMac ? foldDom + codeLangDom : '<span>' + foldDom + codeLangDom + '</span>'}
        <span class="tool copy tooltip" data-tooltip-content="${copyLang}" data-tooltip-offset-y="-2px"><i class="fas fa-copy"></i></span>
      </div>`
        )
        const codeToolsBox = element.parentNode.querySelector('.code-tools-box')
        const copyDom = codeToolsBox.querySelector('.copy')
        const targetFoldDom = codeToolsBox.querySelector('.fold')

        // copy code
        copyDom.addEventListener('click', (event) => {
          const target = event.currentTarget
          const code = [...element.querySelectorAll('.code .line')]
            .map((line) => line.innerText)
            .join('\n')
          const tta = document.createElement('textarea')
          tta.style.top = window.scrollY + 'px'
          tta.style.position = 'absolute'
          tta.style.opacity = '0'
          tta.readOnly = true
          tta.value = code
          document.body.append(tta)
          const selection = document.getSelection()
          const selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false
          tta.select()
          tta.setSelectionRange(0, code.length)
          tta.readOnly = false
          const result = document.execCommand('copy')

          const copyIconDom = target.querySelector('i')
          const copyTooltipDom = codeToolsBox.querySelector('.copy .tooltip-content')

          if (result) {
            copyIconDom.className = 'fas fa-check'
            copyTooltipDom && (copyTooltipDom.innerHTML = copiedLang)
          } else {
            copyIconDom.className = 'fas fa-times'
          }

          tta.blur()
          target.blur()
          if (selected) {
            selection.removeAllRanges()
            selection.addRange(selected)
          }
          document.body.removeChild(tta)
        })

        copyDom.addEventListener('mouseleave', (event) => {
          setTimeout(() => {
            event.target.querySelector('i').className = 'fas fa-copy'
            const copyTooltipDom = codeToolsBox.querySelector('.copy .tooltip-content')
            copyTooltipDom && (copyTooltipDom.innerHTML = copyLang)
          }, 500)
        })

        // fold code block
        let isFold = false
        targetFoldDom.addEventListener('click', (event) => {
          const target = event.currentTarget
          const icon = target.querySelector('i')
          const foldTooltipDom = codeToolsBox.querySelector('.fold .tooltip-content')
          isFold = !isFold
          if (isFold) {
            icon.className = foldedIconClassName
            element.classList.add('folded')
            codeToolsBox.classList.add('folded')
            foldTooltipDom && (foldTooltipDom.innerHTML = foldedLang)
          } else {
            icon.className = 'fas fa-chevron-down'
            element.classList.remove('folded')
            codeToolsBox.classList.remove('folded')
            foldTooltipDom && (foldTooltipDom.innerHTML = foldLang)
          }
        })
      })
    }
    KEEP.utils.initCodeBlockTools()
  }

  const postContentDom = document.querySelector('.post-content')
  if (postContentDom && !postContentDom.classList.contains('code-block-unshrink')) {
    KEEP.utils.shrinkCodeBlock = () => {
      const shrinkHandle = (codeBox) => {
        const limitHeight = 200
        const tipNodeH = 30
        const codeBoxHeight = codeBox.getBoundingClientRect().height
        if (codeBoxHeight - limitHeight > 50) {
          codeBox.style.position = 'relative'
          codeBox.style.overflow = 'hidden'
          codeBox.style.height = `${limitHeight}px`
          const shrinkLineDom = document.createElement('div')
          shrinkLineDom.setAttribute('class', 'shrink-line flex-center')
          shrinkLineDom.style.height = `${tipNodeH}px`
          shrinkLineDom.style.top = `${limitHeight - tipNodeH}px`

          // expand all codes
          shrinkLineDom.addEventListener('click', () => {
            codeBox.style.removeProperty('overflow')
            codeBox.style.overflowY = 'hidden'
            codeBox.style.overflowX = 'auto'
            codeBox.style.height = `${codeBoxHeight}px`
            shrinkLineDom.style.display = 'none'
          })

          codeBox.appendChild(shrinkLineDom)
        }
      }

      document.querySelectorAll('figure.highlight').forEach((element) => {
        shrinkHandle(element)
      })
    }
    KEEP.utils.shrinkCodeBlock()
  }
}
