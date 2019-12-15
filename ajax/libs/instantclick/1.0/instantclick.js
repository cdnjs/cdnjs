// InstantClick 1.0
// (C) 2014 Alexandre Dieulot
// http://instantclick.io/license.html

var InstantClick = function() {
	var currentPathname = location.pathname
	var pId = 0 // short for "preloadId"
	var pHistory = {} // short for "preloadHistory"
	var p = [] // short for "preloads"
	var checkLinkFunction = function() { return true }

	function removeHash(url) {
		var index = url.indexOf('#')
		if (index == -1) {
			return url
		}
		return url.substr(0, index)
	}

	function triggerEvent(name) {
		var event = document.createEvent('HTMLEvents')
		event.initEvent(name, true, true)
		dispatchEvent(event)
	}

	function debug() {
		return {
			currentPathname: currentPathname,
			p0: p[0],
			p1: p[1],
			pHistory: pHistory,
			pId: pId
		}
	}

	function instantanize(initializing) {
		var as = document.getElementsByTagName('a'), a, domain = location.protocol + '//' + location.host
		for (var i = as.length - 1; i >= 0; i--) {
			a = as[i]
			if (a.target || // target="_blank" etc.
				a.href.indexOf(domain + '/') != 0 || // another domain
				a.href.indexOf('#') > -1 && removeHash(a.href) == removeHash(location.href) || // link to an anchor
				a.hasAttribute('data-no-instant') ||
				!checkLinkFunction(a.href.substr(domain.length), a)) {
				continue
			}
			a.addEventListener('mouseover', queue)
			a.addEventListener('click', click)
		}
		if (!initializing) {
			var scripts = document.getElementsByTagName('script'), script, copy, parentNode, nextSibling
			for (i = scripts.length - 1; i >= 0; i--) {
				script = scripts[i]
				copy = document.createElement('script')
				if (script.src) {
					copy.src = script.src
				}
				if (script.innerHTML) {
					copy.innerHTML = script.innerHTML
				}
				parentNode = script.parentNode
				nextSibling = script.nextSibling
				parentNode.removeChild(script)
				parentNode.insertBefore(copy, nextSibling)
			}
		}
		triggerEvent('page:change')
	}

	function queue(e) {
		preload(e.target.href)
	}

	function preload(url) {
		var id = pId
		/* If the user has clicked on a link but the link's content
		   has not been received yet, we preload another in parallel,
		   so that if the first link is taking too much time, the user
		   can exit by clicking another link, like in a normal browser. */
		if (p[pId].state == 'waiting') {
			id ^= 1
			// The ^ character is used to swap between 0 and 1
		}
		p[id].state = 'preloading'
		p[id].url = url
		p[id].body = false
		p[id].timingStart = +new Date
		p[id].timing = false
		p[id].xhr.open('GET', url, true)
		p[id].xhr.send()
	}

	function readystatechange(e) {
		var id = e.target.id

		if (p[id].xhr.readyState < 4) {
			return
		}

		var text = p[id].xhr.responseText

		p[id].timing = +new Date - p[id].timingStart
		// To debug, we know it has been preloaded if `timing` isn't false

		var bodyIndex = text.indexOf('<body')
		if (bodyIndex > -1) {
			p[id].body = text.substr(text.indexOf('>', bodyIndex) + 1)
			var closingIndex = p[id].body.indexOf('</body')
			if (closingIndex > -1) {
				p[id].body = p[id].body.substr(0, closingIndex)
			}

			/* Removing script[data-no-instant] */
			p[id].body = p[id].body.replace(/<script[^>]+data-no-instant[^>]*>[\s\S]*<\/script>/ig, '')
		}
		/* We're only getting the body element's innerHTML, not the
		   element's attributes such as class etc.
		   From a superficial look into it, it seems Turbolinks DOMify
		   the body element so it's able to also get classes etc., and
		   doesn't require an explicit body tag in the html. This
		   should be explored later. */

		var titleIndex = text.indexOf('<title')
		if (titleIndex > -1) {
			p[id].title = text.substr(text.indexOf('>', titleIndex) + 1)
			p[id].title = p[id].title.substr(0, p[id].title.indexOf('</title'))
		}

		pHistory[removeHash(p[id].url)] = {body: p[id].body, title: p[id].title}

		if (id == pId && p[pId].state == 'waiting') {
			display(p[pId].url)
		}
	}

	function click(e) {
		if (e.which > 1 || e.metaKey || e.ctrlKey) { // Opening in new tab
			return
		}
		e.preventDefault()
		display(e.target.href)
	}

	function display(url) {
		if (p[pId].url != url) {
			if (p[pId ^ 1].url != url) {
				throw new Error('Clicked on a link without hovering on it first')
			}
			else {
				pId ^= 1
			}
		}
		if (!p[pId].body) {
			p[pId].state = 'waiting'
			return
		}
		p[pId].state = 'displayed'
		document.body.innerHTML = p[pId].body
		document.title = p[pId].title
		if (p[pId].url != location.href) {
			if (p[pId].url.indexOf('#') == -1) {
				scrollTo(0, 0)
			}
			else {
				var elem = p[pId].url.substr(p[pId].url.indexOf('#') + 1)
				if (document.getElementById(elem) || document.getElementsByName(elem).length > 0) {
					elem = document.getElementById(elem) || document.getElementsByTagName(elem)[0]
					var offset = 0
					for (; elem.offsetParent; elem = elem.offsetParent) {
						offset += elem.offsetTop
					}
					scrollTo(0, offset)
				}
				else {
					scrollTo(0, 0)
				}
			}
			history.pushState(null, null, p[pId].url)
		}
		currentPathname = location.pathname
		instantanize()
	}

	function init() {
		if (!('pushState' in history)) {
			return
		}
		if (p.length) { // already initialized
			return
		}
		if (0 in arguments) {
			checkLinkFunction = arguments[0]
		}
		pHistory[removeHash(location.href)] = {body: document.body.innerHTML, title: document.title}
		for (var i = 0; i < 2; i++) {
			p[i] = {}
			p[i].xhr = new XMLHttpRequest()
			p[i].xhr.id = i
			p[i].xhr.addEventListener('readystatechange', readystatechange)
			p[i].url = false
			p[i].body = false
			p[i].title = false
			p[i].state = ''
			p[i].timingStart = false
			p[i].timing = false
		}
		instantanize(true)

		addEventListener('popstate', function() {
			if (currentPathname == location.pathname) {
				return
			}
			var loc = removeHash(location.href)
			if (!(loc in pHistory)) {
				location.href = location.href // Reloads the page and makes use of cache for assets, unlike location.reload()
				return
			}
			currentPathname = location.pathname
			document.body.innerHTML = pHistory[loc].body
			document.title = pHistory[loc].title
			instantanize()
		})
	}

	return {init: init, debug: debug}
}()
