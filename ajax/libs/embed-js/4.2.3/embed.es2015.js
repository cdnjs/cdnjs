/*
 * embed-js - v4.2.3
 * A JavaScript plugin that analyses the string and embeds emojis, media, tweets, code and services.
 * http://riteshkr.com/embed.js
 *
 *   Made by Ritesh Kumar
 *   Under MIT License
 */

/**
 * Trucates the string and adds ellipsis at the end.
 * @param string        The string to be truncated
 * @param n             Length to which it should be truncated
 * @returns {string}    The truncated string
 */
function truncate (string, n) {
  return string.substr(0, n - 1) + (string.length >= n ? '...' : '')
}

/**
 * Returns an array after removing the duplicates.
 * @param array         The array containing the duplicates
 * @returns {Array}     Array with unique values.
 */


/**
 * Converts a string into legitimate url.
 * @param string
 */
function toUrl (string) {
  return (string.indexOf('//') === -1) ? ('//' + string) : string
}

/**
 * Extends an Object
 * @param destination
 * @param source
 * @returns {*}
 */
function deepExtend (destination, source) {
  for (var property in source) {
    if (source.hasOwnProperty(property) && source[property] && source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      deepExtend(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination
}

function escapeRegExp (str) {
  return str.replace(/[\-\[\]\/\{}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
}

/**
 * Sort an array of objects based on the index value
 * @param  {Array} arr Array to be sorted
 * @return {Array}     Sorted array
 */
function sortObject (arr) {
  return arr.sort((a, b) => (a.index - b.index))
}

/**
 * Creates the string of the iframes after sorting them and finally returning a string
 * @param  {string} str    String to which the created text has to be added
 * @param  {object} embeds Sorted array of iframe html
 * @return {string}        String to be rendered
 */
function createText (str, embeds) {
  let sortedEmbeds = sortObject(embeds);
  for (let i = 0; i < sortedEmbeds.length; i++) {
    str += ` ${sortedEmbeds[i].text}`;
  }
  return str
}

/**
 * Matches the string and finds the substrings matching to the provided regex pattern
 * @param  {object} regex Regex pattern
 * @param  {string} input The string to be analyzed
 * @return {object}       Returns the matched substring with their corresponding positions
 */
function matches (regex, input) {
  return regex.exec(input)
}

/**
 * Checks whether a particular service should be embedded or not based on
 * the setting provided by the user
 * @param  {object} options The options provided by the user
 * @param  {string} service Name of the service for which the condition is to be analyzed
 * @return {boolean}        True if it should be embedded
 */
function ifEmbed (options, service) {
  if (options.singleEmbed && options.served.length) return
  return ((options.excludeEmbed.indexOf(service) === -1) && !(options.excludeEmbed === 'all'))
}

function ifInline (options, service) {
  return ((options.inlineEmbed.indexOf(service) >= 0) || (options.inlineEmbed === 'all'))
}

/**
 * Calculates the dimensions for the elements based on a aspect ratio
 * @param  {object} options Plugin options
 * @return {object}         The width and height of the elements
 */
function setDimensions (options) {
  options.videoWidth = options.videoWidth || ((options.videoHeight) / 3) * 4 || 800;
  options.videoHeight = options.videoHeight || ((options.videoWidth) / 4) * 3 || 600;
  return options
}

/**
 * Returns a cloned object
 * @param  {object} obj
 * @return {object}     cloned object
 */
function cloneObject (obj) {
  if (obj === null || typeof obj !== 'object') return obj
  var temp = obj.constructor(); // give temp the original obj's constructor
  for (var key in obj) {
    temp[key] = cloneObject(obj[key]);
  }
  return temp
}

function urlRegex () {
  return /((href|src)=["']|)(\b(https?|ftp|file):\/\/[^,.\s]+[^\s]*[^,.\s]+)|((https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}))|(?:https?:\/\/)?(?:(?:0rz\.tw)|(?:1link\.in)|(?:1url\.com)|(?:2\.gp)|(?:2big\.at)|(?:2tu\.us)|(?:3\.ly)|(?:307\.to)|(?:4ms\.me)|(?:4sq\.com)|(?:4url\.cc)|(?:6url\.com)|(?:7\.ly)|(?:a\.gg)|(?:a\.nf)|(?:aa\.cx)|(?:abcurl\.net)|(?:ad\.vu)|(?:adf\.ly)|(?:adjix\.com)|(?:afx\.cc)|(?:all\.fuseurl.com)|(?:alturl\.com)|(?:amzn\.to)|(?:ar\.gy)|(?:arst\.ch)|(?:atu\.ca)|(?:azc\.cc)|(?:b23\.ru)|(?:b2l\.me)|(?:bacn\.me)|(?:bcool\.bz)|(?:binged\.it)|(?:bit\.ly)|(?:buff\.ly)|(?:bizj\.us)|(?:bloat\.me)|(?:bravo\.ly)|(?:bsa\.ly)|(?:budurl\.com)|(?:canurl\.com)|(?:chilp\.it)|(?:chzb\.gr)|(?:cl\.lk)|(?:cl\.ly)|(?:clck\.ru)|(?:cli\.gs)|(?:cliccami\.info)|(?:clickthru\.ca)|(?:clop\.in)|(?:conta\.cc)|(?:cort\.as)|(?:cot\.ag)|(?:crks\.me)|(?:ctvr\.us)|(?:cutt\.us)|(?:dai\.ly)|(?:decenturl\.com)|(?:dfl8\.me)|(?:digbig\.com)|(?:digg\.com)|(?:disq\.us)|(?:dld\.bz)|(?:dlvr\.it)|(?:do\.my)|(?:doiop\.com)|(?:dopen\.us)|(?:easyuri\.com)|(?:easyurl\.net)|(?:eepurl\.com)|(?:eweri\.com)|(?:fa\.by)|(?:fav\.me)|(?:fb\.me)|(?:fbshare\.me)|(?:ff\.im)|(?:fff\.to)|(?:fire\.to)|(?:firsturl\.de)|(?:firsturl\.net)|(?:flic\.kr)|(?:flq\.us)|(?:fly2\.ws)|(?:fon\.gs)|(?:freak\.to)|(?:fuseurl\.com)|(?:fuzzy\.to)|(?:fwd4\.me)|(?:fwib\.net)|(?:g\.ro.lt)|(?:gizmo\.do)|(?:gl\.am)|(?:go\.9nl.com)|(?:go\.ign.com)|(?:go\.usa.gov)|(?:goo\.gl)|(?:goshrink\.com)|(?:gurl\.es)|(?:hex\.io)|(?:hiderefer\.com)|(?:hmm\.ph)|(?:href\.in)|(?:hsblinks\.com)|(?:htxt\.it)|(?:huff\.to)|(?:hulu\.com)|(?:hurl\.me)|(?:hurl\.ws)|(?:icanhaz\.com)|(?:idek\.net)|(?:ilix\.in)|(?:is\.gd)|(?:its\.my)|(?:ix\.lt)|(?:j\.mp)|(?:jijr\.com)|(?:kl\.am)|(?:klck\.me)|(?:korta\.nu)|(?:krunchd\.com)|(?:l9k\.net)|(?:lat\.ms)|(?:liip\.to)|(?:liltext\.com)|(?:linkbee\.com)|(?:linkbun\.ch)|(?:liurl\.cn)|(?:ln-s\.net)|(?:ln-s\.ru)|(?:lnk\.gd)|(?:lnk\.ms)|(?:lnkd\.in)|(?:lnkurl\.com)|(?:lru\.jp)|(?:lt\.tl)|(?:lurl\.no)|(?:macte\.ch)|(?:mash\.to)|(?:merky\.de)|(?:migre\.me)|(?:miniurl\.com)|(?:minurl\.fr)|(?:mke\.me)|(?:moby\.to)|(?:moourl\.com)|(?:mrte\.ch)|(?:myloc\.me)|(?:myurl\.in)|(?:n\.pr)|(?:nbc\.co)|(?:nblo\.gs)|(?:nn\.nf)|(?:not\.my)|(?:notlong\.com)|(?:nsfw\.in)|(?:nutshellurl\.com)|(?:nxy\.in)|(?:nyti\.ms)|(?:o-x\.fr)|(?:oc1\.us)|(?:om\.ly)|(?:omf\.gd)|(?:omoikane\.net)|(?:on\.cnn.com)|(?:on\.mktw.net)|(?:onforb\.es)|(?:orz\.se)|(?:ow\.ly)|(?:ping\.fm)|(?:pli\.gs)|(?:pnt\.me)|(?:politi\.co)|(?:post\.ly)|(?:pp\.gg)|(?:profile\.to)|(?:ptiturl\.com)|(?:pub\.vitrue.com)|(?:qlnk\.net)|(?:qte\.me)|(?:qu\.tc)|(?:qy\.fi)|(?:r\.im)|(?:rb6\.me)|(?:read\.bi)|(?:readthis\.ca)|(?:reallytinyurl\.com)|(?:redir\.ec)|(?:redirects\.ca)|(?:redirx\.com)|(?:retwt\.me)|(?:ri\.ms)|(?:rickroll\.it)|(?:riz\.gd)|(?:rt\.nu)|(?:ru\.ly)|(?:rubyurl\.com)|(?:rurl\.org)|(?:rww\.tw)|(?:s4c\.in)|(?:s7y\.us)|(?:safe\.mn)|(?:sameurl\.com)|(?:sdut\.us)|(?:shar\.es)|(?:shink\.de)|(?:shorl\.com)|(?:short\.ie)|(?:short\.to)|(?:shortlinks\.co.uk)|(?:shorturl\.com)|(?:shout\.to)|(?:show\.my)|(?:shrinkify\.com)|(?:shrinkr\.com)|(?:shrt\.fr)|(?:shrt\.st)|(?:shrten\.com)|(?:shrunkin\.com)|(?:simurl\.com)|(?:slate\.me)|(?:smallr\.com)|(?:smsh\.me)|(?:smurl\.name)|(?:sn\.im)|(?:snipr\.com)|(?:snipurl\.com)|(?:snurl\.com)|(?:sp2\.ro)|(?:spedr\.com)|(?:srnk\.net)|(?:srs\.li)|(?:starturl\.com)|(?:su\.pr)|(?:surl\.co.uk)|(?:surl\.hu)|(?:t\.cn)|(?:t\.co)|(?:t\.lh.com)|(?:ta\.gd)|(?:tbd\.ly)|(?:tcrn\.ch)|(?:tgr\.me)|(?:tgr\.ph)|(?:tighturl\.com)|(?:tiniuri\.com)|(?:tiny\.cc)|(?:tiny\.ly)|(?:tiny\.pl)|(?:tinylink\.in)|(?:tinyuri\.ca)|(?:tinyurl\.com)|(?:tl\.gd)|(?:tmi\.me)|(?:tnij\.org)|(?:tnw\.to)|(?:tny\.com)|(?:to\.ly)|(?:togoto\.us)|(?:totc\.us)|(?:toysr\.us)|(?:tpm\.ly)|(?:tr\.im)|(?:tra\.kz)|(?:trunc\.it)|(?:twhub\.com)|(?:twirl\.at)|(?:twitclicks\.com)|(?:twitterurl\.net)|(?:twitterurl\.org)|(?:twiturl\.de)|(?:twurl\.cc)|(?:twurl\.nl)|(?:u\.mavrev.com)|(?:u\.nu)|(?:u76\.org)|(?:ub0\.cc)|(?:ulu\.lu)|(?:updating\.me)|(?:ur1\.ca)|(?:url\.az)|(?:url\.co.uk)|(?:url\.ie)|(?:url360\.me)|(?:url4\.eu)|(?:urlborg\.com)|(?:urlbrief\.com)|(?:urlcover\.com)|(?:urlcut\.com)|(?:urlenco\.de)|(?:urli\.nl)|(?:urls\.im)|(?:urlshorteningservicefortwitter\.com)|(?:urlx\.ie)|(?:urlzen\.com)|(?:usat\.ly)|(?:use\.my)|(?:vb\.ly)|(?:vgn\.am)|(?:vl\.am)|(?:vm\.lc)|(?:w55\.de)|(?:wapo\.st)|(?:wapurl\.co.uk)|(?:wipi\.es)|(?:wp\.me)|(?:x\.vu)|(?:xr\.com)|(?:xrl\.in)|(?:xrl\.us)|(?:xurl\.es)|(?:xurl\.jp)|(?:y\.ahoo.it)|(?:yatuc\.com)|(?:ye\.pe)|(?:yep\.it)|(?:yfrog\.com)|(?:yhoo\.it)|(?:yiyd\.com)|(?:youtu\.be)|(?:yuarel\.com)|(?:z0p\.de)|(?:zi\.ma)|(?:zi\.mu)|(?:zipmyurl\.com)|(?:zud\.me)|(?:zurl\.ws)|(?:zz\.gd)|(?:zzang\.kr)|(?:›\.ws)|(?:✩\.ws)|(?:✿\.ws)|(?:❥\.ws)|(?:➔\.ws)|(?:➞\.ws)|(?:➡\.ws)|(?:➨\.ws)|(?:➯\.ws)|(?:➹\.ws)|(?:➽\.ws))\/[a-z0-9]*/gi
}

function arrayLowercase (options, property) {
  if (typeof options[property] !== 'string') {
    options[property] = options[property].map(function (elem) {
      return elem.toLowerCase()
    });
  }
  return options
}

/**
 * Sets the dimensions and converts options values' Array into lowercase.
 * @param options
 * @returns {Object|*}
 */
function processOptions (options) {
  options = setDimensions(options);
  options = arrayLowercase(options, 'excludeEmbed');
  options = arrayLowercase(options, 'inlineEmbed');
  return arrayLowercase(options, 'openGraphExclude')
}

/**
 * Get the last element of an array or string
 * @param elem [String|Array]
 * @returns last element of the Array or String
 */
function lastElement (elem) {
  return elem[elem.length - 1]
}

var renderer = {
  url (match, options) {
    let config = options.linkOptions;
    return `<a href="${toUrl(match)}" rel="${config.rel}" target="${config.target}">${match}</a>`
  },

  smiley (text, pre, code) {
    return `<span class="icon-emoticon" title="${text}">${pre}${code}</span>`
  },

  emoji (text) {
    return `<span class="emoticon emoticon-${text}" title=":${text}:"></span>`
  },

  audio (match) {
    return `<div class="ejs-audio ejs-plyr ejs-embed"><audio src="${match}" controls class="video-js ejs-video-js"></audio></div>`
  },

  soundcloud (match, options) {
    let config = options.soundCloudOptions;
    return `<div class="ejs-embed">
		<iframe height="160" scrolling="no" src="https://w.soundcloud.com/player/?url=${match}&auto_play=${config.autoPlay}&hide_related=${config.hideRelated}&show_comments= ${config.showComments}&show_user=${config.showUser}&show_reposts=${config.showReposts}&visual=${config.visual}&download=${config.download}&color=${config.themeColor}&theme_color=${config.themeColor}"></iframe>
		</div>`
  },

  spotify (match) {
    let id = lastElement(match.split('/'));
    return `<div class="ejs-embed"><iframe src="https://embed.spotify.com/?uri=spotify:track:${id}" height="80"></iframe></div>`
  },

  codepen (id, options) {
    return `<div class="ejs-embed ejs-codepen"><iframe scrolling="no" height="${options.codeEmbedHeight}" src="${id.replace(/\/pen\//, '/embed/')}/?height=${options.codeEmbedHeight}"></iframe></div>`
  },

  ideone (match, options) {
    return `<div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/${match.split('/')[1]}" frameborder="0" height="${options.codeEmbedHeight}"></iframe></div>`
  },

  jsbin (id, options) {
    return `<div class="ejs-jsbin ejs-embed"><iframe height="${options.codeEmbedHeight}" class="jsbin-embed foo" src="http://${id}/embed?html,js,output"></iframe></div>`
  },

  jsfiddle (id, options) {
    id = lastElement(id) === '/' ? id.slice(0, -1) : id;
    id = (id.indexOf('//') !== -1) ? id : `//${id}`;
    return `<div class="ejs-embed ejs-jsfiddle"><iframe height="${options.codeEmbedHeight}" src="${id}/embedded"></iframe></div>`
  },

  plunker (id, options) {
    return `<div class="ejs-embed ejs-plunker"><iframe class="ne-plunker" src="http://embed.plnkr.co/${id}" height="${options.codeEmbedHeight}"></iframe></div>`
  },

  image (match) {
    return `<div class="ejs-image ejs-embed"><div class="ne-image-wrapper"><img src="${match}"/></div></div>`
  },

  flickr (match, options) {
    return `<div class="ejs-embed"><div class="ne-image-wrapper"><iframe src="${toUrl(match.split('/?')[0])}/player/" width="${options.videoWidth}" height="${options.videoHeight}"></iframe></div></div>`
  },

  instagram (match, options) {
    return `<div class="ejs-embed ejs-instagram"><iframe src="${toUrl(match.split('/?')[0])}/embed/" height="${options.videoHeight}"></iframe></div>`
  },

  facebook (match, options) {
    // check  if it is a video or a post
    const type = match.indexOf('/videos/') < 0 ? 'post' : 'video';
    return `<div class="ejs-embed ejs-facebook"><iframe src="https://www.facebook.com/plugins/${type}.php?href=${toUrl(match.split('/?')[0])}" height="${options.videoHeight}" target="_top" ></iframe></div>`
  },

  slideShare (html) {
    return `<div class="ejs-embed ejs-slideshare">${html}</div>`
  },

  video (match) {
    return `<div class="ejs-video ejs-embed"><div class="ejs-video-player"><div class="ejs-player ejs-plyr"><video src="${match}" class="ejs-video-js video-js" controls></video></div></div></div>`
  },

  dailymotion (match, options) {
    const id = lastElement(match.split('/'));
    return `<div class="ejs-video ejs-embed"><iframe src="http://www.dailymotion.com/embed/video/${id}" height="${options.videoHeight}" width="${options.videoWidth}"></iframe></div>`
  },

  liveleak (match, options) {
    return `<div class="ejs-video ejs-embed"><iframe src="http://www.liveleak.com/e/${match.split('=')[1]}" height="${options.videoHeight}" width="${options.videoWidth}"></iframe></div>`
  },

  ted (match, options) {
    let a = match.split('/');
    const id = a[a.length - 1];
    return `<div class="ejs-embed ejs-ted"><iframe src="http://embed.ted.com/talks/${id}.html" height="${options.videoHeight}" width="${options.videoWidth}"></iframe></div>`
  },

  ustream (match, options) {
    let id = match.split('/');
		// only add embed if it is not already in the link
    if (match.indexOf('/embed/') < 0) {
      id.splice(1, 0, 'embed');
    }

    // check if '//www.' is there in the link
    let prefix = '';
    if (match.indexOf('/www\.ustream\.tv/') < 0) {
      prefix = prefix + '//www.';
    }

    return `<div class="ejs-embed ejs-ustream"><iframe src="${prefix}${id.join('/')}" height="${options.videoHeight}" width="${options.videoWidth}"></iframe></div>`
  },

  detailsVimeo (data, fullData, embedUrl) {
    return `<div class="ejs-video ejs-embed"><div class="ejs-video-preview"><div class="ejs-video-thumb" data-ejs-url="${embedUrl}"><div class="ejs-thumb" style="background-image:url(${data.thumbnail})"></div><i class="fa fa-play-circle-o"></i></div><div class="ejs-video-detail"><div class="ejs-video-title"><a href="${data.url}">${data.title}</a></div><div class="ejs-video-desc">${data.description}</div><div class="ejs-video-stats"><span><i class="fa fa-eye"></i>${data.views}</span><span><i class="fa fa-heart"></i>${data.likes}</span></div></div></div></div>`
  },

  detailsYoutube (data, fullData, embedUrl) {
    return `<div class="ejs-video ejs-embed"><div class="ejs-video-preview"><div class="ejs-video-thumb" data-ejs-url="${embedUrl}"><div class="ejs-thumb" style="background-image:url(${data.thumbnail})"></div><i class="fa fa-play-circle-o"></i></div><div class="ejs-video-detail"><div class="ejs-video-title"><a href="${data.url}">${data.title}</a></div><div class="ejs-video-desc">${data.description}</div><div class="ejs-video-stats"><span><i class="fa fa-eye"></i>${data.views}</span><span><i class="fa fa-heart"></i>${data.likes}</span></div></div></div></div>`
  },

  vine (match, options) {
    const id = lastElement(match.split('/'));
    const config = options.vineOptions;
    return `<div class="ejs-vine"><iframe class="ejs-vine-iframe" src="https://vine.co/v/${id}/embed/${config.type}" height="${config.height}" width="${config.width}"></iframe></div>`
  },

  vimeo (url, options) {
    return options.plyr
			? `<div class='ejs-plyr'><div data-video-type='vimeo' data-video-id='${lastElement(url.split('/'))}'></div></div>`
			: `<div class="ejs-video-player ejs-embed"><iframe src="${url}" frameBorder="0" width="${options.videoWidth}" height="${options.videoHeight}"></iframe></div>`
  },

  youtube (url, options) {
    return options.plyr
			? `<div class='ejs-plyr'><div data-video-type='youtube' data-video-id='${lastElement(url.split('/'))}'></div></div>`
			: `<div class="ejs-video-player ejs-embed"><iframe src="${url}" frameBorder="0" width="${options.videoWidth}" height="${options.videoHeight}"></iframe></div>`
  },

  openGraph (data, options) {
    return `<div class="ejs-embed ejs-ogp"><div class="ejs-ogp-thumb" style="background-image:url(${data.image})"></div><div class="ejs-ogp-details"><div class="ejs-ogp-title"><a href="${data.url}" target="${options.linkOptions.target}">${data.title}</a></div><div class="ejs-ogb-details">${data.description}</div></div></div>`
  },

  github (data, options) {
    return `<div class="ejs-embed ejs-github"><div class="ejs-ogp-thumb" style="background-image:url(${data.owner.avatar_url})"></div><div class="ejs-ogp-details"><div class="ejs-ogp-title"><a href="${data.html_url}" target="${options.linkOptions.target}">${data.full_name}</a></div><div class="ejs-ogb-details">${data.description}</div><div class="ejs-github-stats"><span><i class="fa fa-star"></i>${data.stargazers_count}</span><span><i class="fa fa-code-fork"></i>${data.network_count}</span></div></div></div>`
  },

  gmap (latitude, longitude, location, options) {
    const config = options.mapOptions;
    if (config.mode === 'place') {
      return `<div class="ejs-embed ejs-map"><iframe width="${options.videoWidth}" height="${options.videoHeight}" src="https://www.google.com/maps/embed/v1/place?key=${options.googleAuthKey}&q=${location}"></iframe></div>`
    } else if (config.mode === 'streetview') {
      return `<div class="ejs-embed ejs-map"><iframe width="${options.videoWidth}" height="${options.videoHeight}" src="https://www.google.com/maps/embed/v1/streetview?key=${options.googleAuthKey}&location=${latitude},${longitude}&heading=210&pitch=10&fov=35"></iframe></div>`
    } else if (config.mode === 'view') {
      return `<div class="ejs-embed ejs-map"><iframe width="${options.videoWidth}" height="${options.videoHeight}" src="https://www.google.com/maps/embed/v1/view?key=${options.googleAuthKey}&center=${latitude},${longitude}&zoom=18&maptype=satellite"></iframe></div>`
    }
  }
};

const regex = {
  mentions: /(^|\s)(@[a-z0-9_-]+)/gi,
  hashtag: /(^|\s)(#[a-z\d-]+)/gi,
  basicAudio: /((?:https?):\/\/\S*\.(?:wav|mp3|ogg))/gi,
  soundCloud: /(soundcloud.com)\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_]+/gi,
  spotify: /spotify.com\/track\/[a-zA-Z0-9_]+/gi,
  codepen: /http:\/\/codepen.io\/([A-Za-z0-9_]+)\/pen\/([A-Za-z0-9_]+)/gi,
  gist: /gist.github.com\/[a-zA-Z0-9_-]+\/([a-zA-Z0-9]+)/gi,
  highlightCode: /(`{3})(\s|[a-z]+)\s*([\s\S]*?[^`])\s*\1(?!`)/gm,
  inlineCode: /(`)\s*([\s\S]*?[^`])\s*\1(?!`)/gm,
  ideone: /ideone.com\/[a-zA-Z0-9]{6}/gi,
  jsbin: /jsbin.com\/[a-zA-Z0-9_]+\/[0-9_]+/gi,
  jsfiddle: /jsfiddle.net\/[a-zA-Z0-9_]+\/[a-zA-Z0-9_\/]+/gi,
  plunker: /plnkr.co\/edit\/[a-zA-Z0-9\?=]+/gi,
  basicImage: /((?:https?):\/\/\S*\.(?:gif|jpg|jpeg|tiff|png|svg|webp))/gi,
  flickr: /flickr.com\/[a-z]+\/[a-zA-Z@_$!\d\-\]+\/[\d]+/gi,
  instagram: /instagram.com\/p\/[a-zA-Z0-9_\/\?\-\=]+/gi,
  facebook: /((https?:\/\/)?www\.facebook\.com\/(?:(videos|posts)\.php\?v=\d+|.*?\/(videos|posts)\/\d+\/?))/gi,
  slideShare: /slideshare.net\/[a-zA-Z0-9_-]*\/[a-zA-Z0-9_-]*/gi,
  github: /[^\.]github.com\/([\w\.\-]+)\/([\w\.\-]+)/gi,
  basicVideo: /(?:https?):\/\/\S*\.(?:ogv|webm|mp4)/gi,
  dailymotion: /dailymotion.com\/video\/[a-zA-Z0-9-_]+/gi,
  liveleak: /liveleak.com\/view\?i=[a-zA-Z0-9_]+/gi,
  ted: /ted.com\/talks\/[a-zA-Z0-9_]+/gi,
  ustream: /ustream.tv\/[a-z\/0-9]*/gi,
  vimeo: /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)*/gi,
  vine: /vine.co\/v\/[a-zA-Z0-9]+/gi,
  youtube: /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]|\S*[^\w\-\s]))([\w\-]{11})[?=&+%\w-]*/gi,
  gmap: /@\((.+)\)/gi,
  twitter: /https:\/\/twitter\.com\/\w+\/\w+\/\d+/gi,
  smileys: /:[a-zA-Z0-9-_+]+:(:skin-tone-[2-6]:)?/gi
};

function getEmoji(match) {
	return match[0] === ':' && (lastElement(match) === ':') && match.substring(1, match.length - 1)
}

var emoji = function (output, options) {
	return output.replace(regex.smileys, function (match) {
		if (typeof options.customEmoji === 'function') {
			return options.customEmoji(match);
		} else {
			const emoji = getEmoji(match);
			if (emoji) {
				return options.template.emoji(emoji, options)
			}
		}
		return match;
	});
};

const defaultIcons = [{
	'text': ':)',
	'code': '&#xe60a'
}, {
	'text': ':D',
	'code': '&#xe608'
}, {
	'text': ':d',
	'code': '&#xe608'
}, {
	'text': ':(',
	'code': '&#xe60e'
}, {
	'text': ':/',
	'code': '&#xe620'

}, {
	'text': ':P',
	'code': '&#xe60c'
}, {
	'text': ':p',
	'code': '&#xe60c'
}, {
	'text': '3:)',
	'code': '&#xe618'
}, {
	'text': '(^)',
	'code': '&#xe607'
}, {
	'text': ';)',
	'code': '&#xe610'
}, {
	'text': ':o',
	'code': '&#xe61a'
}, {
	'text': ':O',
	'code': '&#xe61a'
}, {
	'text': '-_-',
	'code': '&#xe61e'
}, {
	'text': '(y)',
	'code': '&#xe606'
}, {
	'text': ':*',
	'code': '&#xe604'
}, {
	'text': '&lt;3',
	'code': '&#xe604'
}, {
	'text': '<3',
	'code': '&#xe604'
}, {
	'text': '&lt;/3',
	'code': '&#xe605'
}, {
	'text': '</3',
	'code': '&#xe605'
}, {
	'text': '^_^',
	'code': '&#xe612'
}, {
	'text': '8-)',
	'code': '&#xe614'
}, {
	'text': '8|',
	'code': '&#xe614'
}, {
	'text': ':S',
	'code': '&#xe61c'
}, {
	'text': ':s',
	'code': '&#xe61c'
}];

var smiley = function (input, options) {
	const icons = options.customFontIcons.length ? options.customFontIcons : defaultIcons;

	const escapedSymbols = icons.map((val) => escapeRegExp(val.text));

	const smileyRegex = new RegExp(`(^|\\s)(${escapedSymbols.join('|')})(?=\\s|$)`, 'gi');

	return input.replace(smileyRegex, (match, pre, text) => {
		let index = escapedSymbols.indexOf(escapeRegExp(text));
		if (index === -1) return match;
		let code  = icons[index].code;
		return options.template.smiley(text, pre, code, options);
	});
};

var url = function (input, options) {
  const config = options.linkOptions;
  return input.replace(urlRegex(), function (match) {
    if (lastElement(match) === ')') return match // hack for markdown image
    let extension = lastElement(match.split('.'));
    if ((lastElement(match) === '/')) { match = match.slice(0, -1); }
    if (config.exclude.indexOf(extension) === -1) { return options.template.url(match, options) }
    return match
  })
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var fetchJsonp = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  if (typeof undefined === 'function' && undefined.amd) {
    undefined(['exports', 'module'], factory);
  } else {
    factory(exports, module);
  }
})(commonjsGlobal, function (exports, module) {
  'use strict';

  var defaultOptions = {
    timeout: 5000,
    jsonpCallback: 'callback',
    jsonpCallbackFunction: null
  };

  function generateCallbackFunction() {
    return 'jsonp_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);
  }

  // Known issue: Will throw 'Uncaught ReferenceError: callback_*** is not defined'
  // error if request timeout
  function clearFunction(functionName) {
    // IE8 throws an exception when you try to delete a property on window
    // http://stackoverflow.com/a/1824228/751089
    try {
      delete window[functionName];
    } catch (e) {
      window[functionName] = undefined;
    }
  }

  function removeScript(scriptId) {
    var script = document.getElementById(scriptId);
    document.getElementsByTagName('head')[0].removeChild(script);
  }

  function fetchJsonp(_url) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    // to avoid param reassign
    var url = _url;
    var timeout = options.timeout || defaultOptions.timeout;
    var jsonpCallback = options.jsonpCallback || defaultOptions.jsonpCallback;

    var timeoutId = undefined;

    return new Promise(function (resolve, reject) {
      var callbackFunction = options.jsonpCallbackFunction || generateCallbackFunction();
      var scriptId = jsonpCallback + '_' + callbackFunction;

      window[callbackFunction] = function (response) {
        resolve({
          ok: true,
          // keep consistent with fetch API
          json: function json() {
            return Promise.resolve(response);
          }
        });

        if (timeoutId) clearTimeout(timeoutId);

        removeScript(scriptId);

        clearFunction(callbackFunction);
      };

      // Check if the user set their own params, and if not add a ? to start a list of params
      url += url.indexOf('?') === -1 ? '?' : '&';

      var jsonpScript = document.createElement('script');
      jsonpScript.setAttribute('src', '' + url + jsonpCallback + '=' + callbackFunction);
      jsonpScript.id = scriptId;
      document.getElementsByTagName('head')[0].appendChild(jsonpScript);

      timeoutId = setTimeout(function () {
        reject(new Error('JSONP request to ' + _url + ' timed out'));

        clearFunction(callbackFunction);
        removeScript(scriptId);
      }, timeout);
    });
  }

  // export as global function
  /*
  let local;
  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }
  local.fetchJsonp = fetchJsonp;
  */

  module.exports = fetchJsonp;
});
});

/**
 * Common template for vimeo and youtube iframes
 * @param  {string} url     URL of the embedding video
 * @param  {object} options Options object
 * @return {string}         compiled template with variables replaced
 */
function template (url, options) {
  return options.template.vimeo(url, options) || options.template.youtube(url, options)
}

/**
 * Plays the video after clicking on the thumbnail
 * @param  {object} options   Options object
 * @return {null}
 */
function playVideo (options) {
	/** Execute the customVideoClickHandler if the user wants to handle it on his own. */
  if (options.customVideoClickHandler) return options.videoClickHandler(options, template)

  let classes = document.getElementsByClassName(options.videoClickClass);
  for (let i = 0; i < classes.length; i++) {
    classes[i].onclick = function () {
      options.onVideoShow();
      let url = this.getAttribute('data-ejs-url') + '?autoplay=true';
      this.parentNode.parentNode.innerHTML = template(url, options);
    };
  }
}

var getDetailsTemplate = function (data, fullData, embedUrl, options) {
  if (data.host === 'vimeo') {
    return options.template.detailsVimeo(data, fullData, embedUrl, options)
  } else if (data.host === 'youtube') {
    return options.template.detailsYoutube(data, fullData, embedUrl, options)
  }
};

/**
 * Applies video.js to all audio and video dynamically
 * @param  {object} options Options object
 * @return {null}
 */
var applyPlyr = function (options) {
  if (options.plyr) {
    if (!options.plugins.plyr) throw new ReferenceError("You have enabled plyr but you haven't loaded the library.Find it at https://plyr.io/")
    let plyr = options.plugins.plyr;
    plyr.setup('.ejs-plyr', options.plyrOptions);
  }
};

/**
 * Applies video.js to all audio and video dynamically
 * @param  {object} options Options object
 * @return {null}
 */
function applyVideoJS (options) {
  options.videojsOptions.width = options.videoWidth;
  options.videojsOptions.height = options.videoHeight;
  if (options.videoJS) {
    if (!options.plugins.videojs) throw new ReferenceError("You have enabled videojs but you haven't loaded the library.Find it at http://videojs.com/")
    let VideoJS = options.plugins.videojs;
    let elements = options.input.getElementsByClassName('ejs-video-js');
    for (let i = 0; i < elements.length; i++) {
      VideoJS(elements[i], options.videojsOptions, () => options.videojsCallback());
    }
  }
}

/**
 * Destroys the onclick event for opening the video template from the details template
 * @param  {className} className
 * @return {null}
 */
var destroyVideos = function (className) {
  const classes = document.getElementsByClassName(className);
  for (let i = 0; i < classes.length; i++) {
    classes[i].onclick = null;
  }
};

function inlineEmbed (_) {
  let regexInline = _.options.link ? new RegExp(`([^>]*${_.regex.source})<\/a>`, 'gm') : new RegExp(`([^\\s]*${_.regex.source})`, 'gm');
  _.output = _.output.replace(regexInline, function (match) {
    let url = _.options.link ? match.slice(0, -4) : match;
    if (_.options.served.indexOf(url) === -1) {
      _.options.served.push(url);
      if (_.options.link) {
        return !_.options.inlineText ? _.template(match.slice(0, -4)) + '</a>' : match + _.template(match.slice(0, -4))
      } else {
        return !_.options.inlineText ? _.template(match) : match + _.template(match)
      }
    } else {
      return match // TODO : check whether this should be `match`
    }
  });
  return [_.output, _.embeds]
}

function normalEmbed (_) {
  let match;
  while ((match = matches(_.regex, _.input)) !== null) {
    let url = match[0];
    if (!(_.options.served.indexOf(url) === -1) || (_.options.served.length && _.options.singleEmbed)) continue
    _.options.served.push(url);
    let text = _.template(url);
    _.embeds.push({
      text: text,
      index: match.index
    });
  }
  return [_.output, _.embeds]
}

function embed (_) {
  return (ifInline(_.options, _.service)) ? inlineEmbed(_) : normalEmbed(_)
}

var base = function (input, output, embeds, options, regex, service) {
  const args = {
    input,
    output,
    options,
    embeds,
    regex,
    service,
    template (match) {
      return this.options.template[this.service](match, this.options)
    }
  };

  return embed(args)
};

function baseEmbed (input, output, embeds, options, regex, service, flag) {
  return ifEmbed(options, service) || (ifEmbed(options, service) && flag) ? base(input, output, embeds, options, regex, service) : [output, embeds]
}

/**
 * This is a private function which is used to get the actual text to be replaced for
 * a particular url in inline embedding. This returns a promise
 * @param  {object} _     reference to this
 * @param  {function} urlToText The function that converts url to replaceable text
 * @param  {object} match     object containing info of matching string
 * @return {Promise}           resolves to the text
 */
function getInlineData (_, urlToText, match) {
  let url = (_.options.link ? match[0].slice(0, -4) : match[0]) || match[1];
  if (_.options.served.indexOf(url) >= 0) return Promise.resolve(null)

  return new Promise((resolve) => {
    urlToText(_, match, url).then((text) => {
      if (!text) return resolve()
      _.options.served.push(url);
      resolve(text);
    });
  })
}

/**
 * A helper function for inline embedding
 * @param _
 * @param urlToText
 * @returns Promise
 */
function inlineAsyncEmbed (_, urlToText) {
  let regexInline = _.options.link ? new RegExp(`([^>]*${_.regex.source})<\/a>`, 'gi') : new RegExp(`([^\\s]*${_.regex.source})`, 'gi');
  let match, promises = [];

  while ((match = matches(regexInline, _.output)) !== null) {
    promises.push(getInlineData(_, urlToText, match));
  }

  return new Promise((resolve) => {
    if (promises.length) {
      Promise.all(promises).then((data) => {
        let i = 0;
        _.output = _.output.replace(regexInline, (matched) => {
          if (_.options.link) {
            return !_.options.inlineText ? data[i++] + '</a>' : matched + data[i++]
          } else {
            return !_.options.inlineText ? data[i++] : matched + data[i++]
          }
        });
        resolve(_.output);
      });
    } else {
      resolve(_.output);
    }
  })
}

function getNormalData (_, urlToText, match) {
  let url = match[0];
  if (_.options.served.indexOf(url) >= 0) return

  return new Promise((resolve) => {
    urlToText(_, match, url, true).then(function (text) {
      if (!text) resolve();
      _.options.served.push(url);
      _.embeds.push({
        text: text,
        index: match.index
      });
      resolve();
    });
  })
}

/**
 * A helper function for normal embedding
 * @param  {object} _
 * @param  {function} urlToText
 * @return {Promise}
 */
function normalAsyncEmbed (_, urlToText) {
  let match, promises = [];
  while ((match = matches(_.regex, _.input)) !== null) {
    promises.push(getNormalData(_, urlToText, match));
  }
  return new Promise(function (resolve) {
    Promise.all(promises).then(function () {
      resolve(_.embeds);
    });
  })
}

function asyncEmbed (_, urlToText) {
  return new Promise(function (resolve) {
    if (ifInline(_.options, _.service)) {
      inlineAsyncEmbed(_, urlToText).then((output) => resolve([output, _.embeds]));
    } else {
      normalAsyncEmbed(_, urlToText).then((embeds) => resolve([_.output, embeds]));
    }
  })
}

class Twitter {
	constructor(input, output, options, embeds) {
		this.input   = input;
		this.output  = output;
		this.options = options;
		this.embeds  = embeds;
		this.regex   = regex.twitter;
		this.service = 'twitter';

		this.load = this.load.bind(this);
		if(typeof this.options.input !== 'string'){
			this.options.input.addEventListener('rendered', this.load, false);
		}
	}

	/**
	 * Fetches the data from twitter's oEmbed API
	 * @param  {string} url URL of the tweet
	 * @return {object}     data containing the tweet info
	 */
	tweetData(url) {
		let config = this.options.tweetOptions;
		let apiUrl = `https://api.twitter.com/1/statuses/oembed.json?omit_script=true&url=${url}&maxwidth=${config.maxWidth}&hide_media=${config.hideMedia}&hide_thread=${config.hideThread}&align=${config.align}&lang=${config.lang}`;
		return new Promise((resolve) => {
			fetchJsonp(apiUrl, {credentials: 'include'})
				.then((data)=>data.json())
				.then((json)=>resolve(json));
		})
	}

	/**
	 * Load twitter widgets
	 * @return null
	 */
	load() {
		const twitter = this.options.plugins.twitter;
		twitter.widgets.load(this.options.element); //here this refers to the element

		//Execute the function after the widget is loaded
		twitter.events.bind('loaded', this.options.onTweetsLoad);
	}

	static urlToText(_this, match, url) {
		return new Promise((resolve) => _this.tweetData(url).then((data) => resolve(data.html)))
	}

	process() {
		return new Promise((resolve) => asyncEmbed(this, Twitter.urlToText).then((data) => resolve(data)))
	}
}

var index = typeof fetch=='function' ? fetch : function(url, options) {
	options = options || {};
	return new Promise( function (resolve, reject) {
		var request = new XMLHttpRequest();

		request.open(options.method || 'get', url);

		for (var i in options.headers) {
			request.setRequestHeader(i, options.headers[i]);
		}

		request.withCredentials = options.credentials=='include';

		request.onload = function () {
			resolve(response());
		};

		request.onerror = reject;

		request.send(options.body);

		function response() {
			var keys = [],
				all = [],
				headers = {},
				header;

			request.getAllResponseHeaders().replace(/^(.*?):\s*([\s\S]*?)$/gm, function (m, key, value) {
				keys.push(key = key.toLowerCase());
				all.push([key, value]);
				header = headers[key];
				headers[key] = header ? (header + "," + value) : value;
			});

			return {
				ok: (request.status/200|0) == 1,		// 200-399
				status: request.status,
				statusText: request.statusText,
				url: request.responseURL,
				clone: response,
				text: function () { return Promise.resolve(request.responseText); },
				json: function () { return Promise.resolve(request.responseText).then(JSON.parse); },
				xml: function () { return Promise.resolve(request.responseXML); },
				blob: function () { return Promise.resolve(new Blob([request.response])); },
				headers: {
					keys: function () { return keys; },
					entries: function () { return all; },
					get: function (n) { return headers[n.toLowerCase()]; },
					has: function (n) { return n.toLowerCase() in headers; }
				}
			};
		}
	});
};

/**
 * Takes the location name and returns the coordinates of that location using the Google
 * Map API v3. This is an async function so it will return a promise.
 * @param  {string} location The name of any location
 * @return {array}           Returns an array in the form [latitude, longitude]
 */
function getCoordinate(location) {
	let url = `http://maps.googleapis.com/maps/api/geocode/json?address=${location}&sensor=false`;
	return new Promise((resolve) => {
		index(url)
			.then((data) => data.json())
			.then((json) => resolve([json.results[0].geometry.location.lat, json.results[0].geometry.location.lng]));
	})
}

/**
 * Returns the template of the Map widget. The source of the iframe is based on whether the
 * mode set in options is 'place', 'streetview' or 'view'.
 * @param  {string} match     The matching string in the form of @(location name).
 * @param  {number} latitude  Latitude of the location
 * @param  {number} longitude Longitude of the location
 * @param  {object} options   plugin options
 * @return {string}           Template of the map widget.
 */
function template$1(match, latitude, longitude, options) {
	const location = locationText(match);
	return options.template.gmap(latitude, longitude, location, options);
}

/**
 * Extracts out the location name from the format @(locationName)
 * @param  {string} match The string in the supported format. Eg : @(Delhi)
 * @return {string}       Only the location name removing @ and brackets. Eg: Delhi
 */
function locationText(match) {
	return match.split('(')[1].split(')')[0]
}

var gmap = function (input, output, options, embeds) {
	let match, promises = [], allMatches = [];

	const service = 'map';

	while ((match = matches(regex.gmap, output)) !== null) {
		options.served.push(match);
		const promise = options.mapOptions.mode !== 'place' ? getCoordinate(match[0]) : Promise.resolve([null, null]);
		promises.push(promise);
		allMatches.push(match);
	}

	return new Promise((resolve) => {
		Promise.all(promises).then((coordinatesArr) => {
			for (var i in promises) {
				let [latitude, longitude] = coordinatesArr[i];
				let text = template$1((allMatches[i])[0], latitude, longitude, options);
				if (ifInline(options, service)) {
					output = output.replace(regex.gmap, (regexMatch) => {
						return `<span class="ejs-location">${locationText(regexMatch)}</span>${text}`
					});
				} else {
					embeds.push({
						text : text,
						index: allMatches[i][0].index
					});
					output = output.replace(regex.gmap, (regexMatch) => {
						return `<span class="ejs-location">${locationText(regexMatch)}</span>`
					});
				}
			}
			resolve([output, embeds]);
		});
	})
};

var markdown = function (output, options) {
  if (!options.plugins.marked) throw new ReferenceError(`marked.js is not loaded.`)

  const Marked = options.plugins.marked;
  const renderer = new Marked.Renderer();

  renderer.link = (href, title, text) => {
    if (href.indexOf('&lt;/a') === -1) return href
    if (href.match(/&gt;(.+)&lt;\/a/gi)) {
      if (!title) title = '';
      return `<a href="${RegExp.$1}" rel=${options.linkOptions.rel}" target="${options.linkOptions.target}" title="${title}">${text}</a>`
    }
  };

  renderer.image = (href, title, text) => {
    if (href.match(/&gt;(.+)&lt;\/a/gi)) {
      if (!title) title = '';
      return `<div class="ejs-image ejs-embed"><div class="ne-image-wrapper"><img src="${RegExp.$1}" title="${title}" alt="${text}"/></div></div>`
    }
    return `<div class="ejs-image ejs-embed"><div class="ne-image-wrapper"><img src="${href}" title="${title}" alt="${text}"/></div></div>`
  };

  renderer.paragraph = (text) => `<p> ${text} </p>`; // for font smiley in end.

	// Fix for heading that should be actually present in marked.js
	// if gfm is true the `## Heading` is acceptable but `##Heading` is not
  Marked.Lexer.rules.gfm.heading = Marked.Lexer.rules.normal.heading;
  Marked.Lexer.rules.tables.heading = Marked.Lexer.rules.normal.heading;

  options.markedOptions.renderer = renderer;
  options.markedOptions.highlight = false;
  return Marked(output, options.markedOptions)
};

/**
 * Encodes the characters like <, > and space and replaces them with
 * &lt;, &gt; and &gt; respectively.
 * @param  {string} code The string that has to be encoded.
 * @return {string}      The encoded string
 */
function encode(code) {
	code = code.replace(/&amp;/gm, '');
	code = code.replace(/&lt;/g, '<');
	code = code.replace(/&gt;/g, '>');
	return code;
}

/**
 * removes whitespace characters
 * @param  {string} code The string from which the whitespace has to be removed
 * @return {string}
 */
function trimSpace(code) {
	code = code.replace(/^([ \t]*)/g, ''); // leading whitespace
	code = code.replace(/[ \t]*$/g, ''); // trailing whitespace
	return code;
}


/**
 * Places the code and the language name in the required template
 * @param {string} processedCode
 * @param {string} language
 * @return {string}
 */
function addTemplate(processedCode, language) {
	return `<pre><code class="ejs-code hljs ${language}">${processedCode.value || processedCode}</code></pre>`
}


/**
 * Replaces the code block with the pre tags and returns a string having the code
 * formatting using Highlight.js.
 * => Matches the string with the regex and finds the code written in three back-ticks ```
 * => Detects whether any language has been provided by the user.
 *     The format supported by embed.js is
 *         ```[language-name]
 *         var a = 2;
 *         ```
 * => Trims all the unnecessary spaces and newlines from the code.
 * => Passes the code to `hljs.highlightAuto(code, language)` which returns a formatted string
 *     having the html tags for styling. The `language` here is optional. In case we don't pass the
 *     language, it tries to detect the language itself.
 * => Replaces the code string in the template with the formatted string
 * @return {string} The string in which the code is formatted
 */
var highlight = function (output, options) {
	output = output.replace(regex.inlineCode, function (match, group1, group2) {
		return `<code>${group2}</code>`
	});

	return output.replace(regex.highlightCode, (match, group1, group2, group3) => {
		let code = group3;
		code     = trimSpace(code);
		code     = encode(code);

		// to prevent auto-linking. Not necessary in code
		// *blocks*, but in code spans. Will be converted
		// back after the auto-linker runs.
		code = code.replace(/:\/\//g, '~P');

		let language = group2.split('\n')[0];
		let highlightedCode;

		const HighlightJS = options.plugins.highlightjs;
		if (language) {
			highlightedCode = HighlightJS.highlightAuto(code, [language]);
		} else {
			highlightedCode = HighlightJS.highlightAuto(code);
			language        = highlightedCode.language;
		}

		return addTemplate(highlightedCode, language);
	});
};

class Gist {
	constructor(input, output, options, embeds) {
		this.input   = input;
		this.output  = output;
		this.options = options;
		this.embeds  = embeds;
		this.regex   = regex.gist;
		this.service = 'gist';

		if(typeof this.options.input !== 'string'){
			this.options.input.addEventListener('rendered', () => {
				this.load();
			});
		}
	}

	template(match) {
		return `<div class="ejs-gist" data-src="${match}"></div>`
	}

	load() {
		let gists = this.options.input.getElementsByClassName('ejs-gist');
		for (let i = 0; i < gists.length; i++) {
			let gistFrame = document.createElement("iframe");
			gistFrame.setAttribute("width", "100%");
			gistFrame.id = `ejs-gist-${i}`;

			let zone       = gists[i];
			zone.innerHTML = "";
			zone.appendChild(gistFrame);

			// Create the iframe's document
			let url           = gists[i].getAttribute('data-src');
			url               = url.indexOf('http') === -1 ? `https://${url}` : url;
			let gistFrameHTML = `<html><base target="_parent"/><body onload="parent.document.getElementById('ejs-gist-${i}').style.height=parseInt(document.body.scrollHeight)+20+'px'"><script type="text/javascript" src="${url}.js"></script></body></html>`;

			// Set iframe's document with a trigger for this document to adjust the height
			let gistFrameDoc = gistFrame.document;

			if (gistFrame.contentDocument) {
				gistFrameDoc = gistFrame.contentDocument;
			} else if (gistFrame.contentWindow) {
				gistFrameDoc = gistFrame.contentWindow.document;
			}

			gistFrameDoc.open();
			gistFrameDoc.writeln(gistFrameHTML);
			gistFrameDoc.close();
		}
	}

	process() {
		return embed(this);
	}
}

function formatData(data) {
	return {
		title         : data.snippet.title,
		thumbnail     : data.snippet.thumbnails.medium.url,
		rawDescription: data.snippet.description,
		views         : data.statistics.viewCount,
		likes         : data.statistics.likeCount,
		description   : truncate(data.snippet.description, 150),
		url           : `https://www.youtube.com/watch?v=${data.id}`,
		id            : data.id,
		host          : 'youtube'
	}
}

function data(id, options) {
	let url      = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${options.googleAuthKey}&part=snippet,statistics`;
	return new Promise((resolve) => {
		index(url)
			.then((data) => data.json())
			.then((json) => resolve(json.items[0]));
	})
}

function urlToText(args, match, url, normalEmbed) {
	let id       = normalEmbed ? match[1] : match[2];
	let embedUrl = `https://www.youtube.com/embed/${id}`;
	if (args.options.videoDetails) {
		return new Promise((resolve) => {
			data(id, args.options).then((data) => resolve(getDetailsTemplate(formatData(data), data, embedUrl, args.options)));
		})
	} else {
		return new Promise((resolve) => resolve(template(embedUrl, args.options)))
	}
}

var youtube = function (input, output, options, embeds) {
	const args = {
		input,
		output,
		options,
		embeds,
		regex  : regex.youtube,
		service: 'youtube'
	};

	return new Promise((resolve) => asyncEmbed(args, urlToText).then((data) => resolve(data)))
};

function formatData$1(data, truncate$$1) {
	return {
		title         : data.title,
		thumbnail     : data.thumbnail_medium,
		rawDescription: data.description.replace(/\n/g, '<br/>').replace(/&#10;/g, '<br/>'),
		views         : data.stats_number_of_plays,
		likes         : data.stats_number_of_likes,
		description   : truncate$$1(data.description.replace(/((<|&lt;)br\s*\/*(>|&gt;)\r\n)/g, ' '), 150),
		url           : data.url,
		id            : data.id,
		host          : 'vimeo'
	}
}

function data$1(id) {
	let url = `https://vimeo.com/api/v2/video/${id}.json`;
	return new Promise((resolve) => {
		index(url)
			.then((data) => data.json())
			.then((json) => resolve(json[0]));
	})
}

function urlToText$1(args, match, url, normalEmbed) {
	let id;
	if (!normalEmbed) {
		id = args.options.link ? match[0].slice(0, -4).split('/').slice(-1).pop() : match[0].split('/').slice(-1).pop();
	} else {
		id = match[3];
	}
	if (!id) return;
	let embedUrl = `https://player.vimeo.com/video/${id}`;
	if (args.options.videoDetails) {
		return new Promise((resolve) => {
			data$1(id).then((data) => resolve(getDetailsTemplate(formatData$1(data, truncate), data, embedUrl, args.options)));
		})
	} else {
		return new Promise((resolve) => resolve(template(embedUrl, args.options)))
	}

}

var vimeo = function (input, output, options, embeds) {
	const args = {
		input,
		output,
		options,
		embeds,
		regex  : regex.vimeo,
		service: 'vimeo'
	};

	return new Promise((resolve) => asyncEmbed(args, urlToText$1).then((data) => resolve(data)))
};

function fetchData(args, url) {
	let api = `http://www.slideshare.net/api/oembed/2?url=${url}&format=jsonp&maxwidth=${args.options.videoWidth}&maxheight=${args.options.videoHeight}`;
	return new Promise((resolve) => {
		fetchJsonp(api, {credentials: 'include'})
			.then((data) => data.json())
			.then((json) => resolve(json.html));
	})
}

function urlToText$2(args, match, url) {
	return new Promise((resolve) => {
		fetchData(args, url).then((html) => resolve(args.template(html)));
	})
}

var slideShare = function (input, output, options, embeds) {
	const args = {
		input, output, options, embeds,
		regex: regex.slideShare,
		service: 'slideshare',
		template(html) {
			return this.options.template.slideShare(html, this.options)
		}
	};

	return new Promise((resolve) => asyncEmbed(args, urlToText$2).then((data) => resolve(data)))
};

function fetchData$1 (url, _) {
  url = encodeURIComponent(url);
  let api = new Function('url', 'return `' + _.options.openGraphEndpoint + '`')(url);
  return new Promise((resolve) => {
    index(api)
			.then((res) => res.json())
			.then((json) => resolve(_.options.onOpenGraphFetch(json) || json));
  })
}

function urlToText$3 (_, match, url) {
  if (url.match(_.excludeRegex)) return Promise.resolve()

  return new Promise((resolve) => {
    fetchData$1(url, _).then((data) => resolve(data && data.success ? _.template(data) : ''));
  })
}

var openGraph = function (input, output, options, embeds) {
  const args = {
    input,
    output,
    options,
    embeds,
    service: 'opengraph',
    regex: urlRegex(),
    excludeRegex: new RegExp(['.mp4|.mp3|.gif|.pdf|.doc|.ppt|.docx|.jpg|.jpeg|.ogg'].concat(options.openGraphExclude).join('|'), 'gi'),
    template (data) {
      return this.options.template.openGraph(data, this.options)
    }
  };

  return new Promise((resolve) => asyncEmbed(args, urlToText$3).then((data) => resolve(data)))
};

function template$2 (data, options) {
  return options.template.github(data, options)
}

function fetchRepo (data) {
  let api = `https://api.github.com/repos/${data.user}/${data.repo}`;
  return new Promise((resolve) =>
		index(api)
			.then(data => data.json())
			.then(json => resolve(json))
	)
}

function urlToText$4 (_this, match, url, normalEmbed) {
  let data = !normalEmbed ? ({
    user: match[2],
    repo: match[3]
  }) : ({
    user: match[1],
    repo: match[2]
  });

  if (!data.repo) return
  return new Promise(function (resolve) {
    fetchRepo(data)
			.then(function (response) {
  return resolve(template$2(response, _this.options))
});
  })
}

var github = function (input, output, options, embeds) {
  const args = {
    input,
    output,
    options,
    embeds,
    service: 'github',
    regex: regex.github
  };

  return new Promise((resolve) => asyncEmbed(args, urlToText$4).then((data) => resolve(data)))
};

var mentions = function (input, options) {
  const mRegex = regex.mentions;
  return input.replace(mRegex, (match, $1, $2) => {
    const username = $2.split('@')[1];
    return $1 + options.mentionsUrl(username)
  })
};

var hashtag = function (input, options) {
  const hRegex = regex.hashtag;
  return input.replace(hRegex, (match, $1, $2) => {
    const username = $2.split('#')[1];
    return $1 + options.hashtagUrl(username)
  })
};

let globalOptions = {};

const defaultOptions = {
	marked: false,
	markedOptions: {},
	link: true,
	linkOptions: {
		target: 'self',
		exclude: ['pdf'],
		rel: ''
	},
	emoji: true,
	customEmoji: [],
	fontIcons: true,
	customFontIcons: [],
	highlightCode: false,
	mentions: false,
	hashtag: false,
	videoJS: false,
	videojsOptions: {
		fluid: true,
		preload: 'metadata'
	},
	plyr: false,
	plyrOptions: {},
	locationEmbed: true,
	mapOptions: {
		mode: 'place'
	},
	tweetsEmbed: false,
	tweetOptions: {
		maxWidth: 550,
		hideMedia: false,
		hideThread: false,
		align: 'none',
		lang: 'en'
	},
	singleEmbed: false,
	openGraphEndpoint: null,
	openGraphExclude: [],
	videoEmbed: true,
	videoHeight: null,
	videoWidth: null,
	videoDetails: true,
	audioEmbed: true,
	imageEmbed: true,
	excludeEmbed: [],
	inlineEmbed: [],
	inlineText: true,
	codeEmbedHeight: 500,
	vineOptions: {
		maxWidth: null,
		type: 'postcard', //'postcard' or 'simple' embedding
		responsive: true,
		width: 350,
		height: 460
	},
	plugins: {
		marked: window.marked,
		videojs: window.videojs,
		plyr: window.plyr,
		highlightjs: window.hljs,
		prismjs: window.Prism,
		twitter: window.twttr
	},
	googleAuthKey: '',
	soundCloudOptions: {
		height: 160,
		themeColor: 'f50000', //Hex Code of the player theme color
		autoPlay: false,
		hideRelated: false,
		showComments: true,
		showUser: true,
		showReposts: false,
		visual: false, //Show/hide the big preview image
		download: false //Show/Hide download buttons
	},
	videoClickClass: 'ejs-video-thumb',
	customVideoClickHandler: false,
	mentionsUrl: function () {
	},
	hashtagUrl: function () {
	},
	beforeEmbedJSApply: function () {
	},
	afterEmbedJSApply: function () {
	},
	onVideoShow: function () {
	},
	onTweetsLoad: function () {
	},
	videojsCallback: function () {
	},
	onOpenGraphFetch: function () {
	},
	onOpenGraphFail: function () {
	},
	videoClickHandler: function () {
	},
	served: [] //Private variable used to store processed urls so that they are not processed multiple times.
};

let instances = [];
let allInstances = [];
let promises = [];

class EmbedJS {
	/**
	 * The constructor takes two arguments. The first one is the options object and the second one is the
	 * optional string . If the user wants to provide a string directly instead of the element, he can do that.
	 * In case the user provides both the input element and the string, the input string will be taken from the element
	 * and the provided string won't be processed.
	 *
	 * @param  {object} options The options object
	 * @param template
	 * @return {null}
	 */
	constructor(options, template$$1) {
		/**
		 * We have created a clone of the original options to make sure that the original object
		 * isn't altered.
		 */
		let defOpts = cloneObject(defaultOptions);
		let globOpts = cloneObject(globalOptions);

		//merge global options with the default options
		let globOptions = deepExtend(defOpts, globOpts);

		//deepExtend global options with the overriding options provided by the user as an options
		//object while creating a new instance of embed.js
		this.options = deepExtend(globOptions, options);

		this.options.template = deepExtend(renderer, template$$1);

		if (!(typeof this.options.input === 'string' || typeof this.options.input === 'object')) throw ReferenceError("You need to pass an element or the string that needs to be processed");

		this.input = (typeof this.options.input === 'object') ? this.options.input.innerHTML : this.options.input;

	}

	/**
	 * Processes the string and performs all the insertions and manipulations based on
	 * the options and the input provided by the user. This returns a promise which is resolved once the result data is ready
	 * @return {Promise} The processes resulting string
	 */
	process() {
		const input = this.input;

		if (input === '') return Promise.resolve('');

		const options = processOptions(this.options);
		let embeds = [];
		let output = input;

		this.options.beforeEmbedJSApply();

		return new Promise((resolve) => {
			if (options.link)
				output = url(input, options);

			const openGraphPromise = options.openGraphEndpoint ? openGraph(input, output, options, embeds) : Promise.resolve([output, embeds]);

			openGraphPromise.then(function ([output, embeds]) {
				if (options.highlightCode) {
					output = highlight(output, options);
				}
				if (options.marked) {
					output = markdown(output, options);
				}
				if (options.emoji) {
					output = emoji(output, options);
				}
				if (options.fontIcons) {
					output = smiley(output, options);
				}
				if (options.mentions) {
					output = mentions(output, options);
				}
				if (options.hashtag) {
					output = hashtag(output, options);
				}

				[output, embeds] = baseEmbed(input, output, embeds, options, regex.ideone, 'ideone');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.plunker, 'plunker');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.jsbin, 'jsbin');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.codepen, 'codepen');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.jsfiddle, 'jsfiddle');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.ted, 'ted');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.dailymotion, 'dailymotion');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.ustream, 'ustream');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.liveleak, 'liveleak');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.basicVideo, 'video', options.videoEmbed);
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.vine, 'vine');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.soundCloud, 'soundcloud');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.spotify, 'spotify');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.basicAudio, 'audio', options.audioEmbed);
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.flickr, 'flickr');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.instagram, 'instagram');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.basicImage, 'image', options.imageEmbed);
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.facebook, 'facebook');

				if (ifEmbed(options, 'gist')) {
					[output, embeds] = new Gist(input, output, options, embeds).process();
				}

				return ifEmbed(options, 'youtube') ? youtube(input, output, options, embeds) : Promise.resolve([output, embeds]);
			}).then(function ([output, embeds]) {
				return ifEmbed(options, 'vimeo') ? vimeo(input, output, options, embeds) : Promise.resolve([output, embeds]);
			}).then(function ([output, embeds]) {
				return ifEmbed(options, 'github') ? github(input, output, options, embeds) : Promise.resolve([output, embeds]);
			}).then(function ([output, embeds]) {
				return options.locationEmbed && ifEmbed(options, 'gmap') ? gmap(input, output, options, embeds) : Promise.resolve([output, embeds])
			}).then(function ([output, embeds]) {
				return ifEmbed(options, 'slideshare') ? slideShare(input, output, options, embeds) : Promise.resolve([output, embeds]);
			}).then(([output, embeds]) => {
				if (options.tweetsEmbed && ifEmbed(options, 'twitter')) {
					this.twitter = new Twitter(input, output, options, embeds);
					return this.twitter.process()
				} else {
					return Promise.resolve([output, embeds])
				}
			}).then(([output, embeds]) => {
				this.data = {
					input: options.input,
					output,
					options,
					inputString: this.input,
					services: options.served,
					template: options.template
				};

				resolve(createText(output, embeds));

			});
		})
	}

	/**
	 * First processes the data by calling the .process() and then renders the data in the div
	 * => Loads the twitter widgets
	 * => Executes the onTweetsLoad() once all the tweets have been rendered
	 * => Applies video.js on the media (both audio and video)
	 * => Triggers video loading on click of the video preview
	 * => Executes afterEmbedJSApply() once everything is done.
	 *
	 * @return Promise
	 */
	render() {
		if (typeof this.options.input === 'string') throw new Error(`You cannot call render method for a string`);
		if (!this.options.input) throw new Error(`You didn't pass an element while creating this instance. render() method can't work without an input element`);

		return new Promise((resolve) => {
			this.process().then((data) => {
				this.options.input.innerHTML = data;
				this.options.input.className += ' embed-js-applied';
				this.applyListeners();
				resolve(this.data);
			});
		})
	}

	/**
	 * This method listens to all the events like click, handle
	 * events to be done after an element has been rendered. These
	 * include twitter widget rendering, gist embedding, click event listeners .
	 */
	applyListeners() {
		applyVideoJS(this.options);
		applyPlyr(this.options);

		playVideo(this.options);

		let event = new Event('rendered');
		this.options.input.dispatchEvent(event);

		this.options.afterEmbedJSApply();
	}


	/**
	 * This function updates the parametrs of the current instance
	 * @param options   New updated options object. will be extended with the older options
	 * @param template  [optional] the new template instance
	 */
	update(options, template$$1) {

		if (options)
			this.options = deepExtend(this.options, options);

		if (template$$1)
			this.options.template = template$$1;

		if (!this.options.input || !(typeof this.options.input === 'string' || typeof this.options.input === 'object')) throw ReferenceError("You need to pass an element or the string that needs to be processed");

		this.input = (typeof this.options.input === 'object') ? this.options.input.innerHTML : this.options.input;
	}

	/**
	 * returns the resulting string based on the input and the options passed by the user.
	 * @return Promise
	 */
	text(callback) {
		this.process().then((data) => callback(data, this.input));
	}

	/**
	 * The destroy method destroys all the listeners and replaces the rih text with the original text in the
	 * element.
	 * @return {null}
	 */
	destroy() {
		if (typeof this.options.input !== 'object') throw new Error(`destroy() method only works if an element had been passed in the options object`);
		destroyVideos('ejs-video-thumb');
		if (this.options.tweetsEmbed)
			this.options.input.removeEventListener('rendered', this.twitter.load(), false);
		this.options.input.innerHTML = this.input;
	}

	/**
	 * Sets options globally
	 * @param {object} options
	 */
	static setOptions(options) {
		globalOptions = deepExtend(defaultOptions, options);
	}

	/**
	 * Applies embed.js to all the elements with the class name provided as option
	 * @return {Promise}
	 * @param selectorName
	 * @param options
	 * @param template
	 */
	static applyEmbedJS(selectorName, options = {}, template$$1 = renderer) {
		let elements = document.querySelectorAll(selectorName);
		for (let i = 0; i < elements.length; i++) {
			options.input = elements[i];
			instances[i] = new EmbedJS(options, template$$1);
			promises[i] = instances[i].render();
		}
		return new Promise(function (resolve) {
			Promise.all(promises).then(function (val) {
				resolve(val);
			});
		})
	}

	/**
	 * Destroys all the instances of EmbedJS created by using applyEmbedJS() method.
	 * @return {null}
	 */
	static destroyEmbedJS() {
		for (let i = 0; i < instances.length; i++) {
			instances[i].destroy();
		}
	}

	/**
	 * Destroys all instances of EmbedJS on the page
	 * @return {null}
	 */
	static destroyAll() {
		for (let i = 0; i < allInstances.length; i++) {
			allInstances[i].destroy();
		}
	}

	/**
	 * Creates a new instance of the Template constructor. This has been done so that multiple
	 * templates of a single service can be used by creating different instances of the Template.
	 *
	 * The usage of the plugin is described below.
	 *
	 * => Create a new Instance of the template by using .Template() method of EmbedJS.
	 *
	 *        var template = EmbedJS.Template()
	 *
	 * => Now create different templates for different service names.
	 *
	 *        template.url = function(match, options){
     * 			return '<a href=" + match + "> + match + </a>'
     * 		}
	 *
	 *        template.instagram = function(match, dimensions, options){
     * 			var config = options.soundCloudOptions;
     * 			return `<div class="ejs-embed ejs-instagram"><iframe src="${toUrl(match.split('/?')[0])}/embed/" height="${dimensions.height}"></iframe></div>`;
     * 		}
	 *
	 */
	static Template() {
		return renderer;
	}
}

export default EmbedJS;
//# sourceMappingURL=embed.es2015.js.map
