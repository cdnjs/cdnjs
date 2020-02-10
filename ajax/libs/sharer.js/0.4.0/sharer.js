/**
 * @preserve
 * Sharer.js
 *
 * @description Create your own social share buttons
 * @version 0.4.0
 * @author Ellison Leao <ellisonleao@gmail.com>
 * @license GPLv3
 *
 */

(function(window, document) {
  'use strict';
  /**
   * @constructor
   */
  var Sharer = function(elem) {
    this.elem = elem;
  };

  /**
   *  @function init
   *  @description bind the events for multiple sharer elements
   *  @returns {Empty}
   */
  Sharer.init = function() {
    var elems = document.querySelectorAll('[data-sharer]'),
      i,
      l = elems.length;

    for (i = 0; i < l; i++) {
      elems[i].addEventListener('click', Sharer.add);
    }
  };

  /**
   *  @function add
   *  @description bind the share event for a single dom element
   *  @returns {Empty}
   */
  Sharer.add = function(elem) {
    var target = elem.currentTarget || elem.srcElement;
    var sharer = new Sharer(target);
    sharer.share();
  };

  // instance methods
  Sharer.prototype = {
    constructor: Sharer,
    /**
     *  @function getValue
     *  @description Helper to get the attribute of a DOM element
     *  @param {String} attr DOM element attribute
     *  @returns {String|Empty} returns the attr value or empty string
     */
    getValue: function(attr) {
      var val = this.elem.getAttribute('data-' + attr);
      // handing facebook hashtag attribute
      if (val && attr === 'hashtag') {
        if (!val.startsWith('#')) {
          val = '#' + val;
        }
      }
      return val;
    },

    /**
     * @event share
     * @description Main share event. Will pop a window or redirect to a link
     * based on the data-sharer attribute.
     */
    share: function() {
      var sharer = this.getValue('sharer').toLowerCase(),
        sharers = {
          facebook: {
            shareUrl: 'https://www.facebook.com/sharer/sharer.php',
            params: {
              u: this.getValue('url'),
              hashtag: this.getValue('hashtag')
            }
          },
          linkedin: {
            shareUrl: 'https://www.linkedin.com/shareArticle',
            params: {
              url: this.getValue('url'),
              mini: true
            }
          },
          twitter: {
            shareUrl: 'https://twitter.com/intent/tweet/',
            params: {
              text: this.getValue('title'),
              url: this.getValue('url'),
              hashtags: this.getValue('hashtags'),
              via: this.getValue('via')
            }
          },
          email: {
            shareUrl: 'mailto:' + this.getValue('to') || '',
            params: {
              subject: this.getValue('subject'),
              body: this.getValue('title') + '\n' + this.getValue('url')
            },
            isLink: true
          },
          whatsapp: {
            shareUrl: this.getValue('web') !== null ? 'https://api.whatsapp.com/send' : 'whatsapp://send',
            params: {
              text: this.getValue('title') + ' ' + this.getValue('url')
            },
            isLink: true
          },
          telegram: {
            shareUrl: this.getValue('web') !== null ? 'https://telegram.me/share' : 'tg://msg_url',
            params: {
              text: this.getValue('title'),
              url: this.getValue('url'),
              to: this.getValue('to')
            },
            isLink: true
          },
          viber: {
            shareUrl: 'viber://forward',
            params: {
              text: this.getValue('title') + ' ' + this.getValue('url')
            },
            isLink: true
          },
          line: {
            shareUrl:
              'http://line.me/R/msg/text/?' + encodeURIComponent(this.getValue('title') + ' ' + this.getValue('url')),
            isLink: true
          },
          pinterest: {
            shareUrl: 'https://www.pinterest.com/pin/create/button/',
            params: {
              url: this.getValue('url'),
              media: this.getValue('image'),
              description: this.getValue('description')
            }
          },
          tumblr: {
            shareUrl: 'http://tumblr.com/widgets/share/tool',
            params: {
              canonicalUrl: this.getValue('url'),
              content: this.getValue('url'),
              posttype: 'link',
              title: this.getValue('title'),
              caption: this.getValue('caption'),
              tags: this.getValue('tags')
            }
          },
          hackernews: {
            shareUrl: 'https://news.ycombinator.com/submitlink',
            params: {
              u: this.getValue('url'),
              t: this.getValue('title')
            }
          },
          reddit: {
            shareUrl: 'https://www.reddit.com/submit',
            params: { url: this.getValue('url') }
          },
          vk: {
            shareUrl: 'http://vk.com/share.php',
            params: {
              url: this.getValue('url'),
              title: this.getValue('title'),
              description: this.getValue('caption'),
              image: this.getValue('image')
            }
          },
          xing: {
            shareUrl: 'https://www.xing.com/app/user',
            params: {
              op: 'share',
              url: this.getValue('url'),
              title: this.getValue('title')
            }
          },
          buffer: {
            shareUrl: 'https://buffer.com/add',
            params: {
              url: this.getValue('url'),
              title: this.getValue('title'),
              via: this.getValue('via'),
              picture: this.getValue('picture')
            }
          },
          instapaper: {
            shareUrl: 'http://www.instapaper.com/edit',
            params: {
              url: this.getValue('url'),
              title: this.getValue('title'),
              description: this.getValue('description')
            }
          },
          pocket: {
            shareUrl: 'https://getpocket.com/save',
            params: {
              url: this.getValue('url')
            }
          },
          digg: {
            shareUrl: 'http://www.digg.com/submit',
            params: {
              url: this.getValue('url')
            }
          },
          stumbleupon: {
            // Usage deprecated, leaving for backwards compatibility.
            shareUrl: 'http://www.stumbleupon.com/submit',
            params: {
              url: this.getValue('url'),
              title: this.getValue('title')
            }
          },
          mashable: {
            shareUrl: 'https://mashable.com/submit',
            params: {
              url: this.getValue('url'),
              title: this.getValue('title')
            }
          },
          mix: {
            shareUrl: 'https://mix.com/add',
            params: {
              url: this.getValue('url')
            }
          },
          flipboard: {
            shareUrl: 'https://share.flipboard.com/bookmarklet/popout',
            params: {
              v: 2,
              title: this.getValue('title'),
              url: this.getValue('url'),
              t: Date.now()
            }
          },
          weibo: {
            shareUrl: 'http://service.weibo.com/share/share.php',
            params: {
              url: this.getValue('url'),
              title: this.getValue('title'),
              pic: this.getValue('image'),
              appkey: this.getValue('appkey'),
              ralateUid: this.getValue('ralateuid'),
              language: 'zh_cn'
            }
          },
          renren: {
            shareUrl: 'http://share.renren.com/share/buttonshare',
            params: {
              link: this.getValue('url')
            }
          },
          myspace: {
            shareUrl: 'https://myspace.com/post',
            params: {
              u: this.getValue('url'),
              t: this.getValue('title'),
              c: this.getValue('description')
            }
          },
          blogger: {
            shareUrl: 'https://www.blogger.com/blog-this.g',
            params: {
              u: this.getValue('url'),
              n: this.getValue('title'),
              t: this.getValue('description')
            }
          },
          baidu: {
            shareUrl: 'http://cang.baidu.com/do/add',
            params: {
              it: this.getValue('title'),
              iu: this.getValue('url')
            }
          },
          douban: {
            shareUrl: 'https://www.douban.com/share/service',
            params: {
              name: this.getValue('title'),
              href: this.getValue('url'),
              image: this.getValue('image')
            }
          },
          okru: {
            shareUrl: 'https://connect.ok.ru/dk',
            params: {
              'st.cmd': 'WidgetSharePreview',
              'st.shareUrl': this.getValue('url'),
              title: this.getValue('title')
            }
          },
          mailru: {
            shareUrl: 'http://connect.mail.ru/share',
            params: {
              share_url: this.getValue('url'),
              linkname: this.getValue('title'),
              linknote: this.getValue('description'),
              type: 'page'
            }
          },
          evernote: {
            shareUrl: 'http://www.evernote.com/clip.action',
            params: {
              url: this.getValue('url'),
              title: this.getValue('title')
            }
          },
          skype: {
            shareUrl: 'https://web.skype.com/share',
            params: {
              url: this.getValue('url'),
              title: this.getValue('title')
            }
          },
          quora: {
            shareUrl: 'https://www.quora.com/share',
            params: {
              url: this.getValue('url'),
              title: this.getValue('title')
            }
          },
          delicious: {
            shareUrl: 'https://del.icio.us/post',
            params: {
              url: this.getValue('url'),
              title: this.getValue('title')
            }
          },
          sms: {
            shareUrl: 'sms://',
            params: {
              body: this.getValue('body')
            }
          },
          trello: {
            shareUrl: 'https://trello.com/add-card',
            params: {
              url: this.getValue('url'),
              name: this.getValue('title'),
              desc: this.getValue('description'),
              mode: 'popup'
            }
          },
          messenger: {
            shareUrl: 'fb-messenger://share',
            params: {
              link: this.getValue('url')
            }
          },
          odnoklassniki: {
            shareUrl: 'https://connect.ok.ru/dk',
            params: {
              st: {
                cmd: 'WidgetSharePreview',
                deprecated: 1,
                shareUrl: this.getValue('url')
              }
            }
          },
          meneame: {
            shareUrl: 'https://www.meneame.net/submit',
            params: {
              url: this.getValue('url')
            }
          },
          diaspora: {
            shareUrl: 'https://share.diasporafoundation.org',
            params: {
              title: this.getValue('title'),
              url: this.getValue('url')
            }
          },
          googlebookmarks: {
            shareUrl: 'https://www.google.com/bookmarks/mark',
            params: {
              op: 'edit',
              bkmk: this.getValue('url'),
              title: this.getValue('title')
            }
          },
          qzone: {
            shareUrl: 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey',
            params: {
              url: this.getValue('url')
            }
          },
          refind: {
            shareUrl: 'https://refind.com',
            params: {
              url: this.getValue('url')
            }
          },
          surfingbird: {
            shareUrl: 'https://surfingbird.ru/share',
            params: {
              url: this.getValue('url'),
              title: this.getValue('title'),
              description: this.getValue('description')
            }
          },
          yahoomail: {
            shareUrl: 'http://compose.mail.yahoo.com',
            params: {
              to: this.getValue('to'),
              subject: this.getValue('subject'),
              body: this.getValue('body')
            }
          },
          wordpress: {
            shareUrl: 'https://wordpress.com/wp-admin/press-this.php',
            params: {
              u: this.getValue('url'),
              t: this.getValue('title'),
              s: this.getValue('title')
            }
          },
          amazon: {
            shareUrl: 'https://www.amazon.com/gp/wishlist/static-add',
            params: {
              u: this.getValue('url'),
              t: this.getValue('title')
            }
          },
          pinboard: {
            shareUrl: 'https://pinboard.in/add',
            params: {
              url: this.getValue('url'),
              title: this.getValue('title'),
              description: this.getValue('description')
            }
          },
          threema: {
            shareUrl: 'threema://compose',
            params: {
              text: this.getValue('text'),
              id: this.getValue('id')
            }
          }
        },
        s = sharers[sharer];

      // custom popups sizes
      if (s) {
        s.width = this.getValue('width');
        s.height = this.getValue('height');
      }
      return s !== undefined ? this.urlSharer(s) : false;
    },
    /**
     * @event urlSharer
     * @param {Object} sharer
     */
    urlSharer: function(sharer) {
      var p = sharer.params || {},
        keys = Object.keys(p),
        i,
        str = keys.length > 0 ? '?' : '';
      for (i = 0; i < keys.length; i++) {
        if (str !== '?') {
          str += '&';
        }
        if (p[keys[i]]) {
          str += keys[i] + '=' + encodeURIComponent(p[keys[i]]);
        }
      }
      sharer.shareUrl += str;

      if (!sharer.isLink) {
        var popWidth = sharer.width || 600,
          popHeight = sharer.height || 480,
          left = window.innerWidth / 2 - popWidth / 2 + window.screenX,
          top = window.innerHeight / 2 - popHeight / 2 + window.screenY,
          popParams = 'scrollbars=no, width=' + popWidth + ', height=' + popHeight + ', top=' + top + ', left=' + left,
          newWindow = window.open(sharer.shareUrl, '', popParams);

        if (window.focus) {
          newWindow.focus();
        }
      } else {
        window.location.href = sharer.shareUrl;
      }
    }
  };

  // adding sharer events on domcontentload
  if (document.readyState === 'complete' || document.readyState !== 'loading') {
    Sharer.init();
  } else {
    document.addEventListener('DOMContentLoaded', Sharer.init);
  }

  // turbolinks 3 compatibility
  window.addEventListener('page:load', Sharer.init);

  // turbolinks 5 compatibility
  window.addEventListener('turbolinks:load', Sharer.init);

  // exporting sharer for external usage
  window.Sharer = Sharer;
})(window, document);
