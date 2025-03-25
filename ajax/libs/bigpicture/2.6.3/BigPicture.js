var BigPicture = (function () {
	// BigPicture.js | license MIT | henrygd.me/bigpicture

	// trigger element used to open popup
	var el;

	// set to true after first interaction
	var initialized;

	// container element holding html needed for script
	var container;

	// currently active display element (image, video, youtube / vimeo iframe container)
	var displayElement;

	// popup image element
	var displayImage;

	// popup video element
	var displayVideo;

	// popup audio element
	var displayAudio;

	// container element to hold youtube / vimeo iframe
	var iframeContainer;

	// iframe to hold youtube / vimeo player
	var iframeSiteVid;

	// store requested image source
	var imgSrc;

	// button that closes the container
	var closeButton;

	// youtube / vimeo video id
	var siteVidID;

	// keeps track of loading icon display state
	var isLoading;

	// timeout to check video status while loading
	var checkMediaTimeout;

	// loading icon element
	var loadingIcon;

	// caption element
	var caption;

	// caption content element
	var captionText;

	// store caption content
	var captionContent;

	// hide caption button element
	var captionHideButton;

	// open state for container element
	var isOpen;

	// gallery open state
	var galleryOpen;

	// used during close animation to avoid triggering timeout twice
	var isClosing;

	// array of prev viewed image urls to check if cached before showing loading icon
	var imgCache = [];

	// store whether image requested is remote or local
	var remoteImage;

	// store animation opening callbacks
	var animationStart;
	var animationEnd;

	// store changeGalleryImage callback
	var onChangeImage;

	// gallery left / right icons
	var rightArrowBtn;

	var leftArrowBtn;

	// position of gallery
	var galleryPosition;

	// hold active gallery els / image src
	var galleryEls;

	// counter element
	var galleryCounter;

	// store images in gallery that are being loaded
	var preloadedImages = {};

	// whether device supports touch events
	var supportsTouch;

	// options object
	var opts;

	// Save bytes in the minified version
	var appendEl = 'appendChild';
	var createEl = 'createElement';
	var removeEl = 'removeChild';

	function BigPicture (options) {
		// initialize called on initial open to create elements / style / event handlers
		initialized || initialize(options);

		// clear currently loading stuff
		if (isLoading) {
			clearTimeout(checkMediaTimeout);
			removeContainer();
		}

		opts = options;

		// store video id if youtube / vimeo video is requested
		siteVidID = options.ytSrc || options.vimeoSrc;

		// store optional callbacks
		animationStart = options.animationStart;
		animationEnd = options.animationEnd;
		onChangeImage = options.onChangeImage;

		// set trigger element
		el = options.el;

		// wipe existing remoteImage state
		remoteImage = false;

		// set caption if provided
		captionContent = el.getAttribute('data-caption');

		if (options.gallery) {
			makeGallery(options.gallery, options.position);
		} else if (siteVidID || options.iframeSrc) {
			// if vimeo, youtube, or iframe video
			// toggleLoadingIcon(true)
			displayElement = iframeContainer;
			createIframe();
		} else if (options.imgSrc) {
			// if remote image
			remoteImage = true;
			imgSrc = options.imgSrc;
			!~imgCache.indexOf(imgSrc) && toggleLoadingIcon(true);
			displayElement = displayImage;
			displayElement.src = imgSrc;
		} else if (options.audio) {
			// if direct video link
			toggleLoadingIcon(true);
			displayElement = displayAudio;
			displayElement.src = options.audio;
			checkMedia('audio file');
		} else if (options.vidSrc) {
			// if direct video link
			toggleLoadingIcon(true);
			if (options.dimensions) {
				changeCSS(displayVideo, ("width:" + (options.dimensions[0]) + "px"));
			}
			makeVidSrc(options.vidSrc);
			checkMedia('video');
		} else {
			// local image / background image already loaded on page
			displayElement = displayImage;
			// get img source or element background image
			displayElement.src =
				el.tagName === 'IMG'
					? el.src
					: window
							.getComputedStyle(el)
							.backgroundImage.replace(/^url|[(|)|'|"]/g, '');
		}

		// add container to page
		container[appendEl](displayElement);
		document.body[appendEl](container);
		return {
			close: close,
			opts: opts,
			updateDimensions: updateDimensions,
			display: displayElement,
			next: function () { return updateGallery(1); },
			prev: function () { return updateGallery(-1); },
		}
	}

	// create all needed methods / store dom elements on first use
	function initialize(options) {
		var startX, isPinch;
		// return close button elements
		function createCloseButton(className) {
			var el = document[createEl]('button');
			el.className = className;
			el.innerHTML =
				'<svg viewBox="0 0 48 48"><path d="M28 24L47 5a3 3 0 1 0-4-4L24 20 5 1a3 3 0 1 0-4 4l19 19L1 43a3 3 0 1 0 4 4l19-19 19 19a3 3 0 0 0 4 0v-4L28 24z"/></svg>';
			return el
		}

		function createArrowSymbol(direction, style) {
			var el = document[createEl]('button');
			el.className = 'bp-lr';
			el.innerHTML =
				'<svg viewBox="0 0 129 129" height="70" fill="#fff"><path d="M88.6 121.3c.8.8 1.8 1.2 2.9 1.2s2.1-.4 2.9-1.2a4.1 4.1 0 0 0 0-5.8l-51-51 51-51a4.1 4.1 0 0 0-5.8-5.8l-54 53.9a4.1 4.1 0 0 0 0 5.8l54 53.9z"/></svg>';
			changeCSS(el, style);
			el.onclick = function (e) {
				e.stopPropagation();
				updateGallery(direction);
			};
			return el
		}

		// add style - if you want to tweak, run through beautifier
		var style = document[createEl]('STYLE');
		var containerColor = (options && options.overlayColor) ? options.overlayColor : 'rgba(0,0,0,.7)';
		style.innerHTML =
			"#bp_caption,#bp_container{bottom:0;left:0;right:0;position:fixed;opacity:0}#bp_container>*,#bp_loader{position:absolute;right:0;z-index:10}#bp_container,#bp_caption,#bp_container svg{pointer-events:none}#bp_container{top:0;z-index:9999;background:" + containerColor + ";opacity:0;transition:opacity .35s}#bp_loader{top:0;left:0;bottom:0;display:flex;align-items:center;cursor:wait;background:0;z-index:9}#bp_loader svg{width:50%;max-width:300px;max-height:50%;margin:auto;animation:bpturn 1s infinite linear}#bp_aud,#bp_container img,#bp_sv,#bp_vid{user-select:none;max-height:96%;max-width:96%;top:0;bottom:0;left:0;margin:auto;box-shadow:0 0 3em rgba(0,0,0,.4);z-index:-1}#bp_sv{background:#111}#bp_sv svg{width:66px}#bp_caption{font-size:.9em;padding:1.3em;background:rgba(15,15,15,.94);color:#fff;text-align:center;transition:opacity .3s}#bp_aud{width:650px;top:calc(50% - 20px);bottom:auto;box-shadow:none}#bp_count{left:0;right:auto;padding:14px;color:rgba(255,255,255,.7);font-size:22px;cursor:default}#bp_container button{position:absolute;border:0;outline:0;background:0;cursor:pointer;transition:all .1s}#bp_container>.bp-x{padding:0;height:41px;width:41px;border-radius:100%;top:8px;right:14px;opacity:.8;line-height:1}#bp_container>.bp-x:focus,#bp_container>.bp-x:hover{background:rgba(255,255,255,.2)}.bp-x svg,.bp-xc svg{display:inline;height:21px;width:20px;fill:#fff;vertical-align:top;}.bp-xc svg{width:16px}#bp_container .bp-xc{left:2%;bottom:100%;padding:9px 20px 7px;background:#d04444;border-radius:2px 2px 0 0;opacity:.85}#bp_container .bp-xc:focus,#bp_container .bp-xc:hover{opacity:1}.bp-lr{top:50%;top:calc(50% - 130px);padding:99px 0;width:6%;background:0;border:0;opacity:.4;transition:opacity .1s}.bp-lr:focus,.bp-lr:hover{opacity:.8}@keyframes bpf{50%{transform:translatex(15px)}100%{transform:none}}@keyframes bpl{50%{transform:translatex(-15px)}100%{transform:none}}@keyframes bpfl{0%{opacity:0;transform:translatex(70px)}100%{opacity:1;transform:none}}@keyframes bpfr{0%{opacity:0;transform:translatex(-70px)}100%{opacity:1;transform:none}}@keyframes bpfol{0%{opacity:1;transform:none}100%{opacity:0;transform:translatex(-70px)}}@keyframes bpfor{0%{opacity:1;transform:none}100%{opacity:0;transform:translatex(70px)}}@keyframes bpturn{0%{transform:none}100%{transform:rotate(360deg)}}@media (max-width:600px){.bp-lr{font-size:15vw}}";
		document.head[appendEl](style);

		// create container element
		container = document[createEl]('DIV');
		container.id = 'bp_container';
		container.onclick = close;
		closeButton = createCloseButton('bp-x');
		container[appendEl](closeButton);
		// gallery touch listeners
		if ('ontouchend' in window && window.visualViewport) {
			supportsTouch = true;
			container.ontouchstart = function (ref) {
				var touches = ref.touches;
				var changedTouches = ref.changedTouches;

				isPinch = touches.length > 1;
				startX = changedTouches[0].pageX;
			};
			container.ontouchend = function (ref) {
				var changedTouches = ref.changedTouches;

				if (galleryOpen && !isPinch && window.visualViewport.scale <= 1) {
					var distX = changedTouches[0].pageX - startX;
					// swipe right
					distX < -30 && updateGallery(1);
					// swipe left
					distX > 30 && updateGallery(-1);
				}
			};
		}

		// create display image element
		displayImage = document[createEl]('IMG');

		// create display video element
		displayVideo = document[createEl]('VIDEO');
		displayVideo.id = 'bp_vid';
		displayVideo.setAttribute('playsinline', true);
		displayVideo.controls = true;
		displayVideo.loop = true;

		// create audio element
		displayAudio = document[createEl]('audio');
		displayAudio.id = 'bp_aud';
		displayAudio.controls = true;
		displayAudio.loop = true;

		// create gallery counter
		galleryCounter = document[createEl]('span');
		galleryCounter.id = 'bp_count';

		// create caption elements
		caption = document[createEl]('DIV');
		caption.id = 'bp_caption';
		captionHideButton = createCloseButton('bp-xc');
		captionHideButton.onclick = toggleCaption.bind(null, false);
		caption[appendEl](captionHideButton);
		captionText = document[createEl]('SPAN');
		caption[appendEl](captionText);
		container[appendEl](caption);

		// left / right arrow icons
		rightArrowBtn = createArrowSymbol(1, 'transform:scalex(-1)');
		leftArrowBtn = createArrowSymbol(-1, 'left:0;right:auto');

		// create loading icon element
		loadingIcon = document[createEl]('DIV');
		loadingIcon.id = 'bp_loader';
		loadingIcon.innerHTML =
			'<svg viewbox="0 0 32 32" fill="#fff" opacity=".8"><path d="M16 0a16 16 0 0 0 0 32 16 16 0 0 0 0-32m0 4a12 12 0 0 1 0 24 12 12 0 0 1 0-24" fill="#000" opacity=".5"/><path d="M16 0a16 16 0 0 1 16 16h-4A12 12 0 0 0 16 4z"/></svg>';
		// create youtube / vimeo container
		iframeContainer = document[createEl]('DIV');
		iframeContainer.id = 'bp_sv';

		// create iframe to hold youtube / vimeo player
		iframeSiteVid = document[createEl]('IFRAME');
		iframeSiteVid.setAttribute('allowfullscreen', true);
		iframeSiteVid.allow = 'autoplay; fullscreen';
		iframeSiteVid.onload = function () { return iframeContainer[removeEl](loadingIcon); };
		changeCSS(
			iframeSiteVid,
			'border:0;position:absolute;height:100%;width:100%;left:0;top:0'
		);
		iframeContainer[appendEl](iframeSiteVid);

		// display image bindings for image load and error
		displayImage.onload = open;
		displayImage.onerror = open.bind(null, 'image');

		window.addEventListener('resize', function () {
			// adjust loader position on window resize
			galleryOpen || (isLoading && toggleLoadingIcon(true));
			// adjust iframe dimensions
			displayElement === iframeContainer && updateDimensions();
		});

		// close container on escape key press and arrow buttons for gallery
		document.addEventListener('keyup', function (ref) {
			var keyCode = ref.keyCode;

			keyCode === 27 && isOpen && close();
			if (galleryOpen) {
				keyCode === 39 && updateGallery(1);
				keyCode === 37 && updateGallery(-1);
				keyCode === 38 && updateGallery(10);
				keyCode === 40 && updateGallery(-10);
			}
		});
		// prevent scrolling with arrow keys if gallery open
		document.addEventListener('keydown', function (e) {
			var usedKeys = [37, 38, 39, 40];
			if (galleryOpen && ~usedKeys.indexOf(e.keyCode)) {
				e.preventDefault();
			}
		});

		// trap focus within conainer while open
		document.addEventListener(
			'focus',
			function (e) {
				if (isOpen && !container.contains(e.target)) {
					e.stopPropagation();
					closeButton.focus();
				}
			},
			true
		);

		// all done
		initialized = true;
	}

	// return transform style to make full size display el match trigger el size
	function getRect() {
		var ref = el.getBoundingClientRect();
		var top = ref.top;
		var left = ref.left;
		var width = ref.width;
		var height = ref.height;
		var leftOffset = left - (container.clientWidth - width) / 2;
		var centerTop = top - (container.clientHeight - height) / 2;
		var scaleWidth = el.clientWidth / displayElement.clientWidth;
		var scaleHeight = el.clientHeight / displayElement.clientHeight;
		return ("transform:translate3D(" + leftOffset + "px, " + centerTop + "px, 0) scale3D(" + scaleWidth + ", " + scaleHeight + ", 0)")
	}

	function makeVidSrc(source) {
		if (Array.isArray(source)) {
			displayElement = displayVideo.cloneNode();
			source.forEach(function (src) {
				var source = document[createEl]('SOURCE');
				source.src = src;
				source.type = "video/" + (src.match(/.(\w+)$/)[1]);
				displayElement[appendEl](source);
			});
		} else {
			displayElement = displayVideo;
			displayElement.src = source;
		}
	}

	function makeGallery(gallery, position) {
		var galleryAttribute = opts.galleryAttribute || 'data-bp';
		if (Array.isArray(gallery)) {
			// is array of images
			galleryPosition = position || 0;
			galleryEls = gallery;
			captionContent = gallery[galleryPosition].caption;
		} else {
			// is element selector or nodelist
			galleryEls = [].slice.call(
				typeof gallery === 'string'
					? document.querySelectorAll((gallery + " [" + galleryAttribute + "]"))
					: gallery
			);
			// find initial gallery position
			var elIndex = galleryEls.indexOf(el);
			galleryPosition =
				position === 0 || position ? position : elIndex !== -1 ? elIndex : 0;
			// make gallery object w/ els / src / caption
			galleryEls = galleryEls.map(function (el) { return ({
				el: el,
				src: el.getAttribute(galleryAttribute),
				caption: el.getAttribute('data-caption'),
			}); });
		}
		// show loading icon if needed
		remoteImage = true;
		// set initial src to imgSrc so it will be cached in open func
		imgSrc = galleryEls[galleryPosition].src;
		!~imgCache.indexOf(imgSrc) && toggleLoadingIcon(true);
		if (galleryEls.length > 1) {
			// if length is greater than one, add gallery stuff
			container[appendEl](galleryCounter);
			galleryCounter.innerHTML = (galleryPosition + 1) + "/" + (galleryEls.length);
			if (!supportsTouch) {
				// add arrows if device doesn't support touch
				container[appendEl](rightArrowBtn);
				container[appendEl](leftArrowBtn);
			}
		} else {
			// gallery is one, just show without clutter
			galleryEls = false;
		}
		displayElement = displayImage;
		// set initial image src
		displayElement.src = imgSrc;
	}

	function updateGallery(movement) {
		var galleryLength = galleryEls.length - 1;

		// only allow one change at a time
		if (isLoading) {
			return
		}

		// return if requesting out of range image
		var isEnd =
			(movement > 0 && galleryPosition === galleryLength) ||
			(movement < 0 && !galleryPosition);
		if (isEnd) {
			// if beginning or end of gallery, run end animation
			if (!opts.loop) {
				changeCSS(displayImage, '');
				setTimeout(
					changeCSS,
					9,
					displayImage,
					("animation:" + (movement > 0 ? 'bpl' : 'bpf') + " .3s;transition:transform .35s")
				);
				return
			}
			// if gallery is looped, adjust position to beginning / end
			galleryPosition = movement > 0 ? -1 : galleryLength + 1;
		}

		// normalize position
		galleryPosition = Math.max(
			0,
			Math.min(galleryPosition + movement, galleryLength)
		)

		// load images before and after for quicker scrolling through pictures
		;[galleryPosition - 1, galleryPosition, galleryPosition + 1].forEach(
			function (position) {
				// normalize position
				position = Math.max(0, Math.min(position, galleryLength));
				// cancel if image has already been preloaded
				if (preloadedImages[position]) { return }
				var src = galleryEls[position].src;
				// create image for preloadedImages
				var img = document[createEl]('IMG');
				img.addEventListener('load', addToImgCache.bind(null, src));
				img.src = src;
				preloadedImages[position] = img;
			}
		);
		// if image is loaded, show it
		if (preloadedImages[galleryPosition].complete) {
			return changeGalleryImage(movement)
		}
		// if not, show loading icon and change when loaded
		isLoading = true;
		changeCSS(loadingIcon, 'opacity:.4;');
		container[appendEl](loadingIcon);
		preloadedImages[galleryPosition].onload = function () {
			galleryOpen && changeGalleryImage(movement);
		};
		// if error, store error object in el array
		preloadedImages[galleryPosition].onerror = function () {
			galleryEls[galleryPosition] = {
				error: 'Error loading image',
			};
			galleryOpen && changeGalleryImage(movement);
		};
	}

	function changeGalleryImage(movement) {
		if (isLoading) {
			container[removeEl](loadingIcon);
			isLoading = false;
		}
		var activeEl = galleryEls[galleryPosition];
		if (activeEl.error) {
			// show alert if error
			alert(activeEl.error);
		} else {
			// add new image, animate images in and out w/ css animation
			var oldimg = container.querySelector('img:last-of-type');
			displayImage = displayElement = preloadedImages[galleryPosition];
			changeCSS(
				displayImage,
				("animation:" + (movement > 0 ? 'bpfl' : 'bpfr') + " .35s;transition:transform .35s")
			);
			changeCSS(oldimg, ("animation:" + (movement > 0 ? 'bpfol' : 'bpfor') + " .35s both"));
			container[appendEl](displayImage);
			// update el for closing animation
			if (activeEl.el) {
				el = activeEl.el;
			}
		}
		// update counter
		galleryCounter.innerHTML = (galleryPosition + 1) + "/" + (galleryEls.length);
		// show / hide caption
		toggleCaption(galleryEls[galleryPosition].caption);
		// execute onChangeImage callback
		onChangeImage && onChangeImage([displayImage, galleryEls[galleryPosition]]);
	}

	// create video iframe
	function createIframe() {
		var url;
		var prefix = 'https://';
		var suffix = 'autoplay=1';

		// create appropriate url
		if (opts.ytSrc) {
			url = prefix + "www.youtube" + (opts.ytNoCookie ? '-nocookie' : '') + ".com/embed/" + siteVidID + "?html5=1&rel=0&playsinline=1&" + suffix;
		} else if (opts.vimeoSrc) {
			url = prefix + "player.vimeo.com/video/" + siteVidID + "?" + suffix;
		} else if (opts.iframeSrc) {
			url = opts.iframeSrc;
		}

		// add loading spinner to iframe container
		changeCSS(loadingIcon, '');
		iframeContainer[appendEl](loadingIcon);

		// set iframe src to url
		iframeSiteVid.src = url;

		updateDimensions();

		setTimeout(open, 9);
	}

	function updateDimensions() {
		var height;
		var width;

		// handle height / width / aspect / max width for iframe
		var windowHeight = window.innerHeight * 0.95;
		var windowWidth = window.innerWidth * 0.95;
		var windowAspect = windowHeight / windowWidth;

		var ref = opts.dimensions || [1920, 1080];
		var dimensionWidth = ref[0];
		var dimensionHeight = ref[1];

		var iframeAspect = dimensionHeight / dimensionWidth;

		if (iframeAspect > windowAspect) {
			height = Math.min(dimensionHeight, windowHeight);
			width = height / iframeAspect;
		} else {
			width = Math.min(dimensionWidth, windowWidth);
			height = width * iframeAspect;
		}

		iframeContainer.style.cssText += "width:" + width + "px;height:" + height + "px;";
	}

	// timeout to check video status while loading
	function checkMedia(errMsg) {
		if (~[1, 4].indexOf(displayElement.readyState)) {
			open();
			// short timeout to to make sure controls show in safari 11
			setTimeout(function () {
				displayElement.play();
			}, 99);
		} else if (displayElement.error) {
			open(errMsg);
		} else {
			checkMediaTimeout = setTimeout(checkMedia, 35, errMsg);
		}
	}

	// hide / show loading icon
	function toggleLoadingIcon(bool) {
		// don't show loading icon if noLoader is specified
		if (opts.noLoader) {
			return
		}
		// bool is true if we want to show icon, false if we want to remove
		// change style to match trigger element dimensions if we want to show
		bool &&
			changeCSS(
				loadingIcon,
				("top:" + (el.offsetTop) + "px;left:" + (el.offsetLeft) + "px;height:" + (el.clientHeight) + "px;width:" + (el.clientWidth) + "px")
			);
		// add or remove loader from DOM
		el.parentElement[bool ? appendEl : removeEl](loadingIcon);
		isLoading = bool;
	}

	// hide & show caption
	function toggleCaption(captionContent) {
		if (captionContent) {
			captionText.innerHTML = captionContent;
		}
		changeCSS(
			caption,
			("opacity:" + (captionContent ? "1;pointer-events:auto" : '0'))
		);
	}

	function addToImgCache(url) {
		!~imgCache.indexOf(url) && imgCache.push(url);
	}

	// animate open of image / video; display caption if needed
	function open(err) {
		// hide loading spinner
		isLoading && toggleLoadingIcon();

		// execute animationStart callback
		animationStart && animationStart();

		// check if we have an error string instead of normal event
		if (typeof err === 'string') {
			removeContainer();
			return opts.onError
				? opts.onError()
				: alert(("Error: The requested " + err + " could not be loaded."))
		}

		// if remote image is loaded, add url to imgCache array
		remoteImage && addToImgCache(imgSrc);

		// transform displayEl to match trigger el
		displayElement.style.cssText += getRect();

		// fade in container
		changeCSS(container, "opacity:1;pointer-events:auto");

		// set animationEnd callback to run after animation ends (cleared if container closed)
		if (animationEnd) {
			animationEnd = setTimeout(animationEnd, 410);
		}

		isOpen = true;

		galleryOpen = !!galleryEls;

		// enlarge displayEl, fade in caption if hasCaption
		setTimeout(function () {
			displayElement.style.cssText += 'transition:transform .35s;transform:none';
			captionContent && setTimeout(toggleCaption, 250, captionContent);
		}, 60);
	}

	// close active display element
	function close(e) {
		var target = e ? e.target : container;
		var clickEls = [
			caption,
			captionHideButton,
			displayVideo,
			displayAudio,
			captionText,
			leftArrowBtn,
			rightArrowBtn,
			loadingIcon ];

		// blur to hide close button focus style
		target.blur();

		// don't close if one of the clickEls was clicked or container is already closing
		if (isClosing || ~clickEls.indexOf(target)) {
			return
		}

		// animate closing
		displayElement.style.cssText += getRect();
		changeCSS(container, 'pointer-events:auto');

		// timeout to remove els from dom; use variable to avoid calling more than once
		setTimeout(removeContainer, 350);

		// clear animationEnd timeout
		clearTimeout(animationEnd);

		isOpen = false;
		isClosing = true;
	}

	// remove container / display element from the DOM
	function removeContainer() {
		// clear src of displayElement (or iframe if display el is iframe container)
		// needs to be done before removing container in IE
		var srcEl =
			displayElement === iframeContainer ? iframeSiteVid : displayElement;
		srcEl.removeAttribute('src');

		// remove container from DOM & clear inline style
		document.body[removeEl](container);
		container[removeEl](displayElement);
		changeCSS(container, '');
		changeCSS(displayElement, '');

		// remove caption
		toggleCaption(false);

		if (galleryOpen) {
			// remove all gallery stuff
			var images = container.querySelectorAll('img');
			for (var i = 0; i < images.length; i++) {
				container[removeEl](images[i]);
			}
			isLoading && container[removeEl](loadingIcon);
			container[removeEl](galleryCounter);
			galleryOpen = galleryEls = false;
			preloadedImages = {};
			supportsTouch || container[removeEl](rightArrowBtn);
			supportsTouch || container[removeEl](leftArrowBtn);
			// in case displayimage changed, we need to update event listeners
			displayImage.onload = open;
			displayImage.onerror = open.bind(null, 'image');
		}

		// run close callback
		opts.onClose && opts.onClose();

		isClosing = isLoading = false;
	}

	// style helper functions
	function changeCSS(ref, newStyle) {
		var style = ref.style;

		style.cssText = newStyle;
	}

	return BigPicture;

}());
