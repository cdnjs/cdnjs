// InstantClick 1.1
// (C) 2014 Alexandre Dieulot
// http://instantclick.io/license.html

var InstantClick = function() {
	var currentLocationWithoutHash
	var pId = 0 // short for "preloadId"
	var pHistory = {} // short for "preloadHistory"
	var p = [] // short for "preloads"
	var supported = 'pushState' in history
	var useBlacklist = false
	var listeners = {change: []}

	function removeHash(url) {
		var index = url.indexOf('#')
		if (index == -1) {
			return url
		}
		return url.substr(0, index)
	}

	function getLinkTarget(target) {
		while (target.nodeName != 'A') {
			target = target.parentNode
		}
		return target
	}

	function on(type, listener) {
		listeners[type].push(listener)
	}

	function triggerEvent(type) {
		for (var i = 0; i < listeners[type].length; i++) {
			listeners[type][i]()
		}
	}

	function debug() {
		return {
			currentLocationWithoutHash: currentLocationWithoutHash,
			p0: p[0],
			p1: p[1],
			pHistory: pHistory,
			pId: pId,
			supported: supported,
			useBlacklist: useBlacklist
		}
	}

	function instantanize(isInitializing) {
		var as = document.getElementsByTagName('a'), a, domain = location.protocol + '//' + location.host
		for (var i = as.length - 1; i >= 0; i--) {
			a = as[i]
			if (a.target || // target="_blank" etc.
				a.href.indexOf(domain + '/') != 0 || // another domain
				a.href.indexOf('#') > -1 && removeHash(a.href) == removeHash(location.href) || // link to an anchor
				(useBlacklist ? a.hasAttribute('data-no-instant') : !a.hasAttribute('data-instant'))) {
				continue
			}
			a.addEventListener('mouseover', queue)
			a.addEventListener('click', click)
		}
		if (!isInitializing) {
			var scripts = document.getElementsByTagName('script'), script, copy, parentNode, nextSibling
			for (i = 0, j = scripts.length; i < j; i++) {
				script = scripts[i]
				if (script.hasAttribute('data-no-instant')) {
					continue
				}
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
		triggerEvent('change')
	}

	function queue(e) {
		var a = getLinkTarget(e.target)
		a.addEventListener('mouseout', mouseout)
		preload(a.href)
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
		p[id].hasBody = true
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
		// Note: For debugging, we know p[pId] has been preloaded if `timing` isn't false

		var titleIndex = text.indexOf('<title')
		if (titleIndex > -1) {
			p[id].title = text.substr(text.indexOf('>', titleIndex) + 1)
			p[id].title = p[id].title.substr(0, p[id].title.indexOf('</title'))
		}

		var bodyIndex = text.indexOf('<body')
		if (bodyIndex > -1) {
			p[id].body = text.substr(text.indexOf('>', bodyIndex) + 1)
			var closingIndex = p[id].body.indexOf('</body')
			if (closingIndex > -1) {
				p[id].body = p[id].body.substr(0, closingIndex)
			}

			pHistory[removeHash(p[id].url)] = {body: p[id].body, title: p[id].title}
		}
		else {
			p[id].hasBody = false
		}
		/* We're only getting the body element's innerHTML, not the
		   element's attributes such as class etc.
		   From a superficial look into it, it seems Turbolinks DOMify
		   the body element so it's able to also get classes etc., and
		   doesn't require an explicit body tag in the html. This
		   should be explored later. */

		if (id == pId && p[pId].state == 'waiting') {
			display(p[pId].url)
		}
	}

	function click(e) {
		if (e.which > 1 || e.metaKey || e.ctrlKey) { // Opening in new tab
			return
		}
		e.preventDefault()
		display(getLinkTarget(e.target).href)
	}

	function display(url) {
		if (p[pId].url != url) {
			if (p[pId ^ 1].url == url) {
				pId ^= 1
			}
		}
		if (!p[pId].body) {
			if (!p[pId].hasBody) {
				location.href = p[pId].url
				return
			}
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
		currentLocationWithoutHash = removeHash(location.href)
		instantanize()
	}

	function mouseout(e) {
		var target = getLinkTarget(e.target)
		var id = pId
		if (p[id].url != target.href && p[id ^ 1].url == target.href) {
			id ^= 1
		}
		if (p[id].state != 'preloading') { // User has clicked the link
			return
		}
		p[id].xhr.abort()
		p[id].state = ''
	}

	function init(arg_useBlacklist) {
		if (!supported) {
			triggerEvent('change')
			return
		}
		if (p.length) { // Already initialized
			return
		}
		if (arg_useBlacklist) {
			useBlacklist = true
		}
		currentLocationWithoutHash = removeHash(location.href)
		pHistory[removeHash(location.href)] = {body: document.body.innerHTML, title: document.title}
		for (var i = 0; i < 2; i++) {
			p[i] = {}
			p[i].xhr = new XMLHttpRequest()
			p[i].xhr.id = i
			p[i].xhr.addEventListener('readystatechange', readystatechange)
			p[i].url = false
			p[i].body = false
			p[i].hasBody = true
			p[i].title = false
			p[i].state = ''
			p[i].timingStart = false
			p[i].timing = false
		}
		instantanize(true)

		addEventListener('popstate', function() {
			var loc = removeHash(location.href)
			if (loc == currentLocationWithoutHash) {
				return
			}
			if (!(loc in pHistory)) {
				location.href = location.href // Reloads the page and makes use of cache for assets, unlike location.reload()
				return
			}
			currentLocationWithoutHash = loc
			document.body.innerHTML = pHistory[loc].body
			document.title = pHistory[loc].title
			instantanize()
		})
	}

	return {
		init: init,
		supported: supported,
		on: on,
		debug: debug
	}
}()
