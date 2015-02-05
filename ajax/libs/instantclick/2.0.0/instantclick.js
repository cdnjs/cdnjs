/* InstantClick 2.0 | (C) 2014 Alexandre Dieulot | http://instantclick.io/license.html */
var InstantClick = function(document, location) {
	var currentLocationWithoutHash
	var urlToPreload
	var preloadTimer

	var pHistory = {} // short for "preloadHistory"
	var p = {} // short for "preloads"

	var useBlacklist
	var preloadOnMousedown
	var delayBeforePreload
	var listeners = {change: []}

	////////// HELPERS //////////

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

	function triggerPageEvent(type) {
		for (var i = 0; i < listeners[type].length; i++) {
			listeners[type][i]()
		}
	}

	function applyBody(body) {
		var doc = document.implementation.createHTMLDocument('')
		doc.documentElement.innerHTML = body
		document.documentElement.replaceChild(doc.body, document.body)
	}

	////////// EVENT HANDLERS //////////

	function mousedown(e) {
		preload(getLinkTarget(e.target).href)
	}

	function mouseover(e) {
		var a = getLinkTarget(e.target)
		a.addEventListener('mouseout', mouseout)

		if (!delayBeforePreload) {
			preload(a.href)
		}
		else {
			urlToPreload = a.href
			preloadTimer = setTimeout(preload, delayBeforePreload)
		}
	}

	function click(e) {
		if (e.which > 1 || e.metaKey || e.ctrlKey) { // Opening in new tab
			return
		}
		e.preventDefault()
		display(getLinkTarget(e.target).href)
	}

	function mouseout() {
		if (preloadTimer) {
			clearTimeout(preloadTimer)
			preloadTimer = false
			return
		}

		if (!p.isPreloading || (p.isPreloading && p.isWaitingForCompletion)) {
			return
		}
		p.xhr.abort()
		p.isPreloading = false
		p.isWaitingForCompletion = false
	}

	function readystatechange(e) {
		if (p.xhr.readyState < 4) {
			return
		}
		if (p.xhr.status == 0) { // Aborted
			return
		}

		p.timing.ready = +new Date - p.timing.start

		var text = p.xhr.responseText

		var titleIndex = text.indexOf('<title')
		if (titleIndex > -1) {
			p.title = text.substr(text.indexOf('>', titleIndex) + 1)
			p.title = p.title.substr(0, p.title.indexOf('</title'))
		}

		var bodyIndex = text.indexOf('<body')
		if (bodyIndex > -1) {
			p.body = text.substr(bodyIndex)
			var closingIndex = p.body.indexOf('</body')
			if (closingIndex > -1) {
				p.body = p.body.substr(0, closingIndex)
			}

			var urlWithoutHash = removeHash(p.url)
			pHistory[urlWithoutHash] = {
				body: p.body,
				title: p.title,
				scrollY: urlWithoutHash in pHistory ? pHistory[urlWithoutHash].scrollY : 0
			}
		}
		else {
			p.hasBody = false
		}

		if (p.isWaitingForCompletion) {
			p.isWaitingForCompletion = false
			display(p.url)
		}
	}

	////////// MAIN FUNCTIONS //////////

	function instantanize(isInitializing) {
		var as = document.getElementsByTagName('a'), a, domain = location.protocol + '//' + location.host
		for (var i = as.length - 1; i >= 0; i--) {
			a = as[i]
			if (a.target || // target="_blank" etc.
				a.hasAttribute('download') ||
				a.href.indexOf(domain + '/') != 0 || // another domain (or no href attribute)
				a.href.indexOf('#') > -1 && removeHash(a.href) == currentLocationWithoutHash || // link to an anchor
				(useBlacklist ? a.hasAttribute('data-no-instant') : !a.hasAttribute('data-instant'))) {
				continue
			}
			if (preloadOnMousedown) {
				a.addEventListener('mousedown', mousedown)
			}
			else {
				a.addEventListener('mouseover', mouseover)
			}
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
		triggerPageEvent('change')
	}

	function preload(url) {
		if (!preloadOnMousedown && 'display' in p.timing && +new Date - (p.timing.start + p.timing.display) < 100) {
			/* After a page is displayed, if the user's cursor happens to be above a link
			   a mouseover event will be in most browsers triggered automatically, and in
			   other browsers it will be triggered when the user moves his mouse by 1px.

			   Here are the behavior I noticed, all on Windows:
			   - Safari 5.1: auto-triggers after 0 ms
			   - IE 11: auto-triggers after 30-80 ms (looks like it depends on page's size)
			   - Firefox: auto-triggers after 10 ms
			   - Opera 18: auto-triggers after 10 ms

			   - Chrome: triggers when cursor moved
			   - Opera 12.16: triggers when cursor moved

			   To remedy to this, we do not start preloading if last display occured less than
			   100 ms ago. If they happen to click on the link, they will be redirected.
			*/

			return
		}
		if (preloadTimer) {
			clearTimeout(preloadTimer)
			preloadTimer = false
		}

		if (!url) {
			url = urlToPreload
		}

		if ((p.isPreloading && url == p.url) || (p.isPreloading && p.isWaitingForCompletion)) {
			return
		}
		p.isPreloading = true
		p.isWaitingForCompletion = false

		p.url = url
		p.body = false
		p.hasBody = true
		p.timing = {}
		p.timing.start = +new Date
		p.xhr.open('GET', url)
		p.xhr.send()
	}

	function display(url) {
		if (!('display' in p.timing)) {
			p.timing.display = +new Date - p.timing.start
		}
		if (preloadTimer) {
			/* Happens when there’s a delay before preloading and that delay
			   hasn't expired (preloading didn't kick in).
			*/

			if (p.url && p.url != url) {
				/* Happens when the user clicks on a link before preloading
				   kicks in while another link is already preloading.
				*/

				location.href = url
				return
			}
			preload(url)
			p.isWaitingForCompletion = true
			return
		}
		if (!p.isPreloading || (p.isPreloading && p.isWaitingForCompletion)) {
			/* If the page isn't preloaded, it likely means
			   the user has focused on a link (with his Tab
			   key) and then pressed Return, which triggered a click.
			   Because very few people do this, it isn't worth handling this
			   case and preloading on focus (also, focussing on a link
			   doesn't mean it's likely that you'll "click" on it), so we just
			   redirect them when they "click".
			   It could also mean the user hovered over a link less than 100 ms
			   after a page display, thus we didn't start the preload (see
			   comments in `preload()` for the rationale behind this.)

			   If the page is waiting for completion, the user clicked twice
			   while the page was preloading.
			   Two possibilities:
			   1) He clicks on the same link again, either because it's slow
			      to load (there's no browser loading indicator with
			      InstantClick, so he might think his click hasn't registered
			      if the page isn't loading fast enough) or because he has
			      a habit of double clicking on the web;
			   2) He clicks on another link.

			   In the first case, we redirect him (send him to the page the old
			   way) so that he can have the browser's loading indicator back.
			   In the second case, we redirect him because we haven't preloaded
			   that link, since we were already preloading the last one.

			   Determining if it's a double click might be overkill as there is
			   (hopefully) not that many people that double click on the web.
			   Fighting against the perception that the page is stuck is
			   interesting though, a seemingly good way to do that would be to
			   later incorporate a progress bar.
			*/

			location.href = url
			return
		}
		if (!p.hasBody) {
			location.href = p.url
			return
		}
		if (!p.body) {
			p.isWaitingForCompletion = true
			return
		}
		pHistory[currentLocationWithoutHash].scrollY = pageYOffset
		p.isPreloading = false
		p.isWaitingForCompletion = false
		applyBody(p.body)
		document.title = p.title
		var hashIndex = p.url.indexOf('#')
		var hashElem = hashIndex > -1 && document.getElementById(p.url.substr(hashIndex + 1))
		var offset = 0
		if (p.url != location.href && hashElem) {
			for (; hashElem.offsetParent; hashElem = hashElem.offsetParent) {
				offset += hashElem.offsetTop
			}
		}
		scrollTo(0, offset)
		history.pushState(null, null, p.url)
		currentLocationWithoutHash = removeHash(location.href)
		instantanize()
	}

	////////// PUBLIC FUNCTIONS AND VARIABLE //////////

	var supported = 'pushState' in history

	function init() {
		if (!supported) {
			triggerPageEvent('change')
			return
		}
		if (currentLocationWithoutHash) { // Already initialized
			return
		}
		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i]
			if (arg === true) {
				useBlacklist = true
			}
			else if (arg == 'mousedown') {
				preloadOnMousedown = true
			}
			else if (typeof arg == 'number') {
				delayBeforePreload = arg
			}
		}
		currentLocationWithoutHash = removeHash(location.href)
		pHistory[currentLocationWithoutHash] = {
			body: document.body.outerHTML,
			title: document.title,
			scrollY: pageYOffset
		}
		p.xhr = new XMLHttpRequest()
		p.xhr.addEventListener('readystatechange', readystatechange)
		p.url = false
		p.body = false
		p.hasBody = true
		p.title = false
		p.isPreloading = false
		p.isWaitingForCompletion = false
		p.timing = {}
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
			pHistory[currentLocationWithoutHash].scrollY = pageYOffset

			currentLocationWithoutHash = loc
			applyBody(pHistory[loc].body)
			scrollTo(0, pHistory[loc].scrollY)
			document.title = pHistory[loc].title
			instantanize()
		})
	}

	function on(type, listener) {
		// Add a function that will be executed with `triggerPageEvent`
		listeners[type].push(listener)
	}

	function debug() {
		return {
			currentLocationWithoutHash: currentLocationWithoutHash,
			p: p,
			pHistory: pHistory,
			supported: supported,
			useBlacklist: useBlacklist
		}
	}

	////////////////////

	return {
		supported: supported,
		init: init,
		on: on,
		debug: debug
	}

}(document, location);
