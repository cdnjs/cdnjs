# Social Likes

Beautiful “like” buttons with counters for popular social networks: Facebook, Twitter, LiveJournal, etc. Uses jQuery.


## Features

- Easy to install.
- Beautiful and all in one style.
- Won’t explode your page’s layout.


## Installation and configuration

Use [interactive builder](http://sapegin.github.io/social-likes/) to generate the code.

Or install via [Bower](http://bower.io/): `$ bower install social-likes`.


## Advanced configuration

### Options

Options define via HTML data attributes.

`url`

URL of shareable page. Current page by default.

`title`

Title for Twitter, Vkontakte and LiveJournal. Current page’s title by default.

`html`

HTML code for LiveJournal button. By default <A> tag with link to current page.

`counters`

Disables “likes” counters when “no”. Default: “yes”.

`single-title`

Share button title for “single button” mode. Default: “Share”.

Examples:

```html
<ul class="social-likes" data-url="http://landscapists.info/" data-title="Landscapists of Russia">
	…
</ul>
```

```html
<ul class="social-likes social-likes_single" data-single-title="This is Sharing!">
	…
</ul>
```

### Services specific options

#### Twitter

You can specify `via` (site’s Twitter) and `related` (any other Twitter you want to advertise) values for `<li class="twitter">`:

```html
<li class="twitter" data-via="sapegin" data-related="Landscapists">Twitter</li>
```

#### Pinterest

You should specify an image URL via data-media attribute on `<li class="pinterest">`:

```html
<li class="pinterest" data-media="http://example.com/image/url.jpg">Pinterest</li>
```


### Experimental Google+ counter

Place `googleplusonecount.php` somewhere on your server. And change buttons HTML like this:

```html
<li class="plusone" data-counter="http://example.com/path/to/googleplusonecount.php?url={url}&amp;callback=?">Google+</li>
```

### Adding your own button

Define `socialLikesButtons` hash:

```javascript
var socialLikesButtons = {
	surfingbird: {
		popupUrl: 'http://surfingbird.ru/share?url={url}',
		pupupWidth: 650,
		popupHeight: 500
	}
};
```

Add some CSS:

```css
.social-likes__button_surfingbird {
	background: #f2f3f5;
	color: #596e7e;
	border-color: #ced5e2;
	}
.social-likes__icon_surfingbird {
	background: url(http://surfingbird.ru/img/share-icon.png) no-repeat 2px 3px;
	}
```

And use in like any other button:

```html
<li class="surfingbird">Surf</li>
```

See sources (`src` folder) for available options and class names.


### Title, description and image for Facebok and Twitter

You can add they using [Facebook Open Graph](http://davidwalsh.name/facebook-meta-tags) and [Twitter Card](https://dev.twitter.com/docs/cards):

```html
<meta property="og:type" content="article">
<meta property="og:url" content="{page_url}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{description}">
<meta property="og:image" content="{image_url}">
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@SiteTwitter">
<meta name="twitter:creator" content="@sapegin">
```

### How to use Social Likes with Wordpress, etc.

See [wiki](https://github.com/sapegin/social-likes/wiki/How-to-use-Social-Likes-with-Wordpress,-etc.).

## Release History

### 2013-04-23 v2.0.8

* New Odnoklassniki API.
* Improved manual initialization.
* Compress CSS with CSSO.

### 2013-02-05 v2.0.7

* `data-title` and `data-url` attributes (by @jalkoby).
* Pinterest button (mostly by @jalkoby).
* Code button removed.


---

## License

The MIT License, see the included `License.md` file.
