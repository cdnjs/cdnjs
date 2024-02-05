const utils = {
    debounce: function (func, wait, immediate) {
        let timeout
        return function () {
            const context = this
            const args = arguments
            const later = function () {
                timeout = null
                if (!immediate) func.apply(context, args)
            }
            const callNow = immediate && !timeout
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
            if (callNow) func.apply(context, args)
        }
    },

    throttle: function (func, wait, options) {
        let timeout, context, args
        let previous = 0
        if (!options) options = {}

        const later = function () {
            previous = options.leading === false ? 0 : new Date().getTime()
            func.apply(context, args)
            context = args = null
        }

        return function () {
            const now = new Date().getTime()
            if (!previous && options.leading === false) previous = now
            const remaining = wait - (now - previous)
            context = this
            args = arguments
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout)
                    timeout = null
                }
                previous = now
                func.apply(context, args)
                if (!timeout) context = args = null
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining)
            }
        }
    },

    fadeIn: (ele, time) => {
        ele.style.cssText = `display:block;animation: to_show ${time}s`
    },

    fadeOut: (ele, time) => {
        ele.addEventListener('animationend', function f() {
            ele.style.cssText = "display: none; animation: '' "
            ele.removeEventListener('animationend', f)
        })
        ele.style.animation = `to_hide ${time}s`
    },

    sidebarPaddingR: () => {
        const innerWidth = window.innerWidth
        const clientWidth = document.body.clientWidth
        const paddingRight = innerWidth - clientWidth
        if (innerWidth !== clientWidth) {
            document.body.style.paddingRight = paddingRight + 'px'
        }
    },

    snackbarShow: (text, showAction, duration) => {
        const sa = (typeof showAction !== 'undefined') ? showAction : false
        const dur = (typeof duration !== 'undefined') ? duration : 5000
        document.styleSheets[0].addRule(':root', '--sco-snackbar-time:' + dur + 'ms!important')
        Snackbar.show({
            text: text,
            showAction: sa,
            duration: dur,
            pos: 'top-center'
        })
    },

    copy: async (text) => {
        try {
            await navigator.clipboard.writeText(text)
            utils.snackbarShow(GLOBAL_CONFIG.lang.copy.success, false, 2000)
        } catch (err) {
            utils.snackbarShow(GLOBAL_CONFIG.lang.copy.error, false, 2000)
        }
    },

    getEleTop: ele => {
        let actualTop = 0
        while (ele) {
            actualTop += ele.offsetTop
            ele = ele.offsetParent
        }
        return actualTop
    },

    randomNum: (length) => {
        return Math.floor(Math.random() * length)
    },

    timeDiff: (timeObj, today) => {
        const timeDiff = today.getTime() - timeObj.getTime();
        return Math.floor(timeDiff / (1000 * 3600 * 24));
    },

    scrollToDest: (pos, time = 500) => {
        const currentPos = window.pageYOffset
        const isNavFixed = document.getElementById('page-header').classList.contains('nav-fixed')
        if (currentPos > pos || isNavFixed) pos = pos - 70
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: pos,
                behavior: 'smooth'
            })
            return
        }
        let start = null
        const distance = pos - currentPos
        window.requestAnimationFrame(function step(currentTime) {
            start = !start ? currentTime : start
            const progress = currentTime - start
            if (progress < time) {
                window.scrollTo(0, currentPos + distance * progress / time)
                window.requestAnimationFrame(step)
            } else {
                window.scrollTo(0, pos)
            }
        })
    },
    siblings: (ele, selector) => {
        return [...ele.parentNode.children].filter((child) => {
            if (selector) {
                return child !== ele && child.matches(selector)
            }
            return child !== ele
        })
    },
    isMobile: () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isHidden: e => 0 === e.offsetHeight && 0 === e.offsetWidth,
    addEventListenerPjax: function (element, eventType, callback, useCapture = false) {
        if (element == null) return
        element.addEventListener(eventType, callback, useCapture);
        utils.addGlobalFn("pjax", function () {
            element.removeEventListener(eventType, callback, useCapture);
        });
    },
    addGlobalFn: (key, fn, name = false, parent = window) => {
        const globalFn = parent.globalFn || {}
        const keyObj = globalFn[key] || {}

        if (name && keyObj[name]) return

        name = name || Object.keys(keyObj).length
        keyObj[name] = fn
        globalFn[key] = keyObj
        parent.globalFn = globalFn
    },
    animateIn: (ele, text) => {
        ele.style.display = 'block'
        ele.style.animation = text
    },
    animateOut: (ele, text) => {
        ele.addEventListener('animationend', function f() {
            ele.style.display = ''
            ele.style.animation = ''
            ele.removeEventListener('animationend', f)
        })
        ele.style.animation = text
    }
}