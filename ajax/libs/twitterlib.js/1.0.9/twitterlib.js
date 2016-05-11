// twitterlib.js (c) 2011 Remy Sharp
// @version 1.0.9 / Sun Feb 19 23:05:25 2012 +0000
// MIT license: http://rem.mit-license.org
(function (global) {
  var twitterlib = {};

  // for Node.js - a quasi document polyfill
  if (typeof exports !== 'undefined' && typeof require === 'function') {
    var urlparse = require('url').parse,
        http = require('http');

    this.document = {
      location: {
        protocol: 'http:'
      },
      head: {
        appendChild: function (element) {
          if (!element.src) return; // exit if we're not a script
          // send request
          var urldata = urlparse(element.src, true),
              request = http.request(urldata),
              json = '';
          var callback = window[urldata.query.callback];

          request.on('response', function (res) {
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
              json += chunk;
            }).on('end', function() {
              switch (res.statusCode) {
              case 200:
                json = json.replace(new RegExp('^' + urldata.query.callback + '\\('), '').replace(/\);*$/, '');

                outstanding[urldata.query.callback] && callback(JSON.parse(json));
                break;
              case 304:
                break;
              case 401:
                // console.error('not authed');
                break;
              }
            });
          }).end();
        }
      },
      getElementById: function () {},
      createElement: function (type) {
        return {
          type: type,
          id: null,
          src: ''
        };
      }
    };
  }


  var guid = +new Date,
      window = this,
      document = window.document,
      head = document.head || document.getElementsByTagName('head')[0],
      last = {}, // memorisation object for the next method
      outstanding = {}, // reference object to allow us to cancel JSONP calls (though nulling the return function)
      ENTITIES = {
        '&quot;': '"',
        '&lt;': '<',
        '&gt;': '>'
      },
      protocol = document.location.protocol.substr(0, 4) === 'http' ? document.location.protocol : 'http:',
      URLS = {
        search: protocol + '//search.twitter.com/search.json?q=%search%&page=%page|1%&rpp=%limit|100%&since_id=%since|remove%&result_type=recent&include_entities=true', // TODO allow user to change result_type
        timeline: protocol + '//api.twitter.com/1/statuses/user_timeline.json?screen_name=%user%&count=%limit|200%&page=%page|1%&since_id=%since|remove%include_rts=%rts|false%&include_entities=true',
        list: protocol + '//api.twitter.com/1/%user%/lists/%list%/statuses.json?page=%page|1%&per_page=%limit|200%&since_id=%since|remove%&include_entities=true&include_rts=%rts|false%',
        favs: protocol + '//api.twitter.com/1/favorites/%user%.json?include_entities=true&skip_status=true&page=%page|1%&since_id=%since|remove%',
        retweets: protocol + '//api.twitter.com/1/statuses/retweeted_by_user.json?screen_name=%user%&include_entities=true&count=%limit|200%&since_id=%since|remove%&page=%page|1%'
      },
      urls = URLS, // allows for resetting debugging
      undefined,
      caching = false;

  var ify = function() {
    return {
      entities: function (t) {
        return t.replace(/(&[a-z0-9]+;)/g, function (m) {
          return ENTITIES[m];
        });
      },
      link: function(t) {
        return t.replace(/[a-z]+:\/\/([a-z0-9-_]+\.[a-z0-9-_:~\+#%&\?\/.=]+[^:\.,\)\s*$])/ig, function(m, link) {
          return '<a title="' + m + '" href="' + m + '">' + ((link.length > 36) ? link.substr(0, 35) + '&hellip;' : link) + '</a>';
        });
      },
      at: function(t) {
        return t.replace(/(^|[^\w]+)\@([a-zA-Z0-9_]{1,15}(\/[a-zA-Z0-9-_]+)*)/g, function(m, m1, m2) {
          return m1 + '<a href="http://twitter.com/' + m2 + '">@' + m2 + '</a>';
        });
      },
      hash: function(t) {
        return t.replace(/(^|[^&\w'"]+)\#([a-zA-Z0-9_^"^<]+)/g, function(m, m1, m2) {
          return m.substr(-1) === '"' || m.substr(-1) == '<' ? m : m1 + '<a href="http://search.twitter.com/search?q=%23' + m2 + '">#' + m2 + '</a>';
        });
      },
      clean: function(tweet) {
        return this.hash(this.at(this.link(tweet)));
      }
    };
  }();

  var expandLinks = function (tweet) {
    if (tweet === undefined) return '';

    var text = tweet.text,
        i = 0;
    if (tweet.entities) {
      // replace urls with expanded urls and let the ify shorten the link
      if (tweet.entities.urls && tweet.entities.urls.length) {
        for (i = 0; i < tweet.entities.urls.length; i++) {
          if (tweet.entities.urls[i].expanded_url) text = text.replace(tweet.entities.urls[i].url, tweet.entities.urls[i].expanded_url); // /g ?
        }
      }

      // replace media with url to actual image (or thing?)
      if (tweet.entities.media && tweet.entities.media.length) {
        for (i = 0; i < tweet.entities.media.length; i++) {
          if (tweet.entities.media[i].media_url || tweet.entities.media[i].expanded_url) text = text.replace(tweet.entities.media[i].url, tweet.entities.media[i].media_url ? tweet.entities.media[i].media_url : tweet.entities.media[i].expanded_url); // /g ?
        }
      }

    }

    return text;
  };

  var time = function () {
    var monthDict = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
      time: function (date) {
        var hour = date.getHours(),
            min = date.getMinutes() + "",
            ampm = 'AM';

        if (hour == 0) {
          hour = 12;
        } else if (hour == 12) {
          ampm = 'PM';
        } else if (hour > 12) {
          hour -= 12;
          ampm = 'PM';
        }

        if (min.length == 1) {
          min = '0' + min;
        }

        return hour + ':' + min + ' ' + ampm;
      },
      date: function (date) {
        var mon = monthDict[date.getMonth()],
            day = date.getDate()+'',
            dayi = ~~(day),
            year = date.getFullYear(),
            thisyear = (new Date()).getFullYear(),
            th = 'th';

        // anti-'th' - but don't do the 11th, 12th or 13th
        if ((dayi % 10) == 1 && day.substr(0, 1) != '1') {
          th = 'st';
        } else if ((dayi % 10) == 2 && day.substr(0, 1) != '1') {
          th = 'nd';
        } else if ((dayi % 10) == 3 && day.substr(0, 1) != '1') {
          th = 'rd';
        }

        if (day.substr(0, 1) == '0') {
          day = day.substr(1);
        }

        return mon + ' ' + day + th + (thisyear != year ? ', ' + year : '');
      },
      shortdate: function (time_value) {
        var values = time_value.split(" "),
            parsed_date = Date.parse(values[1] + " " + values[2] + ", " + values[5] + " " + values[3]),
            date = new Date(parsed_date),
            mon = monthDict[date.getMonth()],
            day = date.getDate()+'',
            year = date.getFullYear(),
            thisyear = (new Date()).getFullYear();

        if (thisyear === year) {
          return day + ' ' + mon;
        } else {
          return day + ' ' + mon + (year+'').substr(2, 2);
        }
      },
      datetime: function (time_value) {
        var values = time_value.split(" "),
            date = new Date(Date.parse(values[1] + " " + values[2] + ", " + values[5] + " " + values[3]));

        return this.time(date) + ' ' + this.date(date);
      },
      relative: function (time_value) {
        var values = time_value.split(" "),
            parsed_date = Date.parse(values[1] + " " + values[2] + ", " + values[5] + " " + values[3]),
            date = new Date(parsed_date),
            relative_to = (arguments.length > 1) ? arguments[1] : new Date(),
            delta = ~~((relative_to.getTime() - parsed_date) / 1000),
            r = '';

        delta = delta + (relative_to.getTimezoneOffset() * 60);

        if (delta <= 1) {
          r = '1 second ago';
        } else if (delta < 60) {
          r = delta + ' seconds ago';
        } else if (delta < 120) {
          r = '1 minute ago';
        } else if (delta < (45*60)) {
          r = (~~(delta / 60)) + ' minutes ago';
        } else if (delta < (2*90*60)) { // 2* because sometimes read 1 hours ago
          r = '1 hour ago';
        } else if (delta < (24*60*60)) {
          r = (~~(delta / 3600)) + ' hours ago';
        } else {
          r = this.shortdate(time_value);
        }

        return r;
      }
    };
  }();

  var filter = (function () {
    return {
      match: function (tweet, search, includeHighlighted) {
        var i = 0, s = '', text = tweet.text.toLowerCase(),
            notonly = (!search['and'] || !search['and'].length) && (!search['or'] || !search['or'].length);

        if (typeof search == "string") {
          search = this.format(search);
        }

        // loop ignore first
        if (search['not'] && search['not'].length) {
          for (i = 0; i < search['not'].length; i++) {
            if (text.indexOf(search['not'][i]) !== -1) {
              return false;
            }
          }

          if (notonly) {
            return true;
          }
        } else if (({}).toString.call(search['not']) !== '[object Array]') {
          if (search['not'].test(text)) {
            return false;
          }

          if (notonly) {
            return true;
          }
        }

        if (search['and'] && search['and'].length) {
          for (i = 0; i < search['and'].length; i++) {
            s = search['and'][i];

            if (s.substr(0, 3) === 'to:') {
              if (!RegExp('^@' + s.substr(3)).test(text)) {
                return false;
              }
            } else if (s.substr(0, 5) == 'from:') {
              if (tweet.user.screen_name !== s.substr(5)) {
                return false;
              }
            } else if (text.indexOf(s) === -1) {
              return false;
            }
          }
        } else if (typeof search['and'] == 'function') {
          if (search['and'].test(text)) {
            return true;
          }
        }

        if (search['or'] && search['or'].length) {
          for (i = 0; i < search['or'].length; i++) {
            s = search['or'][i];

            if (s.substr(0, 3) === 'to:') {
              if (RegExp('^@' + s.substr(3)).test(text)) {
                return true;
              }
            } else if (s.substr(0, 5) == 'from:') {
              if (tweet.user.screen_name === s.substr(5)) {
                return true;
              }
            } else if (text.indexOf(search['or'][i]) !== -1) {
              return true;
            }
          }
        } else if (typeof search['or'] == 'function') {
          if (search['or'].test(text)) {
            return true;
          }
        } else if (search['and'] && search['and'].length) {
          return true;
        }

        return false;
      },

      format: function (search, caseSensitive) {
        // search can match search.twitter.com format
        var blocks = [], ors = [], ands = [], i = 0, negative = [], since = '', until = '';

        search.replace(/(-?["'](.*?)["']|\S+)/g, function (m) { // removed \b for chinese character support
          var neg = false;
          if (m.substr(0, 1) == '-') {
            neg = true;
          }
          m = m.replace(/["']+|["']+$/g, '');

          if (neg) {
            negative.push(m.substr(1).toLowerCase());
          } else {
            blocks.push(m);
          }
        });

        for (i = 0; i < blocks.length; i++) {
          if (blocks[i] == 'OR' && blocks[i+1]) {
            ors.push(blocks[i-1].toLowerCase());
            ors.push(blocks[i+1].toLowerCase());
            i++;
            ands.pop(); // remove the and test from the last loop
          } else {
            ands.push(blocks[i].toLowerCase());
          }
        }

        return {
          'or' : ors,
          'and' : ands,
          'not' : negative
        };

      },

      // tweets typeof Array
      matchTweets: function (tweets, search, includeHighlighted) {
        var updated = [], tmp, i = 0;

        if (typeof search == 'string') {
          search = this.format(search);
        }

        for (i = 0; i < tweets.length; i++) {
          if (this.match(tweets[i], search, includeHighlighted)) {
            updated.push(tweets[i]);
          }
        }

        return updated;
      }
    };
  })();

  // based on twitter.com list of tweets, most common format for tweets
  function render(tweet) {
    var html = '<li><div class="tweet">';
    html += '<div class="vcard"><a href="http://twitter.com/' + tweet.user.screen_name + '" class="url"><img style="height: 48px; width: 48px;" alt="' + tweet.user.name + '" class="photo fn" height="48" src="' + tweet.user.profile_image_url + '" width="48" /></a></div>';
    html += '<div class="hentry"><strong><a href="http://twitter.com/';
    html += tweet.user.screen_name + '" ';
    html += 'title="' + tweet.user.name + '">' + tweet.user.screen_name + '</a></strong> ';
    html += '<span class="entry-content">';
    html += twitterlib.ify.clean(tweet.text); //twitterlib.expandLinks(tweet));
    html += '</span> <span class="meta entry-meta"><a href="http://twitter.com/' + tweet.user.screen_name;
    html += '/status/' + tweet.id_str + '" class="entry-date" rel="bookmark"><span class="published" title="';
    html += twitterlib.time.datetime(tweet.created_at) + '">' + twitterlib.time.relative(tweet.created_at) + '</span></a>';
    if (tweet.source) html += ' <span>from ' + tweet.source + '</span>';
    if (tweet.retweetedby) html += ' <span>retweeted by ' + tweet.retweetedby.screen_name + '</span>';
    html += '</span></div></div></li>';

    return html;
  }

  function clean(guid) {
    var el = document.getElementById(twitterlib + guid);
    if (el) {
      head.removeChild(document.getElementById(twitterlib + guid));
    }
    delete outstanding[twitterlib + guid];
    window[twitterlib + guid] = undefined;
    try{ delete window[ twitterlib + guid ]; } catch(e){}
  }

  function load(url, options, callback) {
    var script = document.createElement('script'), match = null;
    if (options == undefined) options = {};
    guid++;
    outstanding['twitterlib' + guid] = true;
    window['twitterlib' + guid] = (function (guid, options) { // args are now private and static
      return function (tweets) {
        // remove original script include
        var i = 0, parts = [];

        // let's expand the urls by default
        i = tweets.length;
        while (i--) {
          tweets[i].originalText = tweets[i].text;
          tweets[i].text = expandLinks(tweets[i]);
        }

        if (tweets.results) {
          tweets = tweets.results;
          i = tweets.length;

          // fix the user prop to match "normal" API calls
          while (i--) {
            tweets[i].user = { id: tweets[i].from_user_id, screen_name: tweets[i].from_user, profile_image_url: tweets[i].profile_image_url };
            tweets[i].source = twitterlib.ify.entities(tweets[i].source);

            // fix created_at
            parts = tweets[i].created_at.split(' ');
            tweets[i].created_at = [parts[0],parts[2],parts[1],parts[4],parts[5], parts[3]].join(' ').replace(/,/, '');
          }
        } else if (tweets.length && tweets[0].sender) { // DM - we'll change it to look like a tweet
          i = tweets.length;
          while (i--) {
            tweets[i].user = tweets[i].sender;
            tweets[i].originalText = tweets[i].text;
            tweets[i].text = '@' + tweets[i].recipient_screen_name + ' ' + tweets[i].text;
          }
        } else if (options.rts == true || options.rts == 't' || options.rts == 1) {
          // scan for native retweets and swap them in as real tweets
          i = tweets.length;
          while (i--) {
            if (tweets[i].retweeted_status) {
                tweets[i].retweeted_status.retweetedby = tweets[i].user;
              tweets[i] = tweets[i].retweeted_status;
            }
          }
        }

        options.originalTweets = tweets;
        if (options.filter) {
          tweets = filter.matchTweets(tweets, options.filter);
        }

        if (options.limit && options.limit < tweets.length) {
          // chop
          tweets = tweets.splice(0, options.limit);
        }

        if (caching && options.page > 1) {
          try {
            sessionStorage.setItem('twitterlib.page' + options.page + '.tweets', JSON.stringify(tweets));
            sessionStorage.setItem('twitterlib.page' + options.page + '.originalTweets', JSON.stringify(options.originalTweets));
            sessionStorage.setItem('twitterlib.page' + options.page, 'true');
          } catch (e) {
            // possible QUOTA EXCEEDED
          }
        }

        options.cached = false;

        callback.call(twitterlib, tweets, options);
        // clean up
        clean(guid);
      };
    })(guid, options);

    match = url.match(/callback=(.*)/);
    if (match != null && match.length > 1) {
      window[match[1]] = window['twitterlib' + guid];
    } else {
      url += '&callback=' + 'twitterlib' + guid;
    }

    // all first requests go via live
    if (!caching || options.page <= 1 || (caching && sessionStorage.getItem('twitterlib.page' + options.page) == null)) {
      script.src = url;
      script.id = 'twitterlib' + guid;
      head.appendChild(script);
    } else if (caching) {
      clean(guid);
      options.cached = true;

      options.originalTweets = JSON.parse(sessionStorage.getItem('twitterlib.page' + options.page + '.originalTweets'));
      // reset the tweets - so we can cache but refilter
      var tweets = JSON.parse(sessionStorage.getItem('twitterlib.page' + options.page + '.tweets') || '[]');
      if (options.filter) {
        tweets = filter.matchTweets(tweets, options.filter);
      }

      if (options.limit && options.limit < tweets.length) {
        // chop
        tweets = tweets.splice(0, options.limit);
      }

      callback.call(twitterlib, tweets, options);
    }
  }

  function getUrl(type, options) {
    options = options || {};
    return urls[type].replace(/(\b.*?)%(.*?)(\|.*?)?%/g, function (a, q, key, def) {
      // remove empty values that shouldn't be sent
      if (def && def.substr(1) == 'remove' && options[key] == undefined) {
        return '';
      }

      var val = key == 'limit' ? options[key] + 10 : options[key];
      return q + (options[key] === undefined && def !== undefined ? def.substr(1) : val);
    }) + (!!this.accessToken ? '&access_token=' + this.accessToken : '');
  }

  function normaliseArgs(options, callback) {
    if (typeof options == 'function') {
      callback = options;
      options = {};
    }
    if (options === undefined) options = {};
    options.page = options.page || 1;
    options.callback = callback;
    if (options.limit === 0) {
      delete options.limit;
    }
    return options;
  }

  // save the last type of request, with all their options - so we can hit twitterlib.next() and it'll automagically prepopulate the filters, etc.
  function setLast(method, arg, options) {
    last = {
      method: method,
      arg: arg,
      options: options,
      callback: options.callback,
      page: options.page || 1
    };

    options.method = method;

    if (caching) {
      var last_request = JSON.parse(sessionStorage.getItem('twitterlib.last_request') || '{}');
      if (last.method != last_request.method || last.arg != last_request.arg) {
        clearCache();
        sessionStorage.setItem('twitterlib.last_request', JSON.stringify(last));
      }
    }
  }

  function clearCache() {
    var i = sessionStorage.length;
    while (i--) {
      if (sessionStorage.key(i).substr(0, 'twitterlib'.length) == 'twitterlib') {
        sessionStorage.removeItem(sessionStorage.key(i));
      }
    }
  }

  // create a new method on twitterlib, that hits the given url,
  // i.e. twitterlib.custom('dm', '/proxy.php?page=%page%&type=direct_messages');
  // can now be called using twitterlib.dm('rem', function (t) { });
  function custom(name, url, defaults) {
    if (url && urls[name] == undefined) urls[name] = url;
    if (this[name] == undefined) {
      this[name] = function (term, options, callback) {
        // handle "termless" custom methods
        if (typeof term == 'function') {
          callback = term;
          term = '';
        } else if (term.toString() == '[Object object]') {
          callback = options;
          options = term;
          term = '';
        }
        options = normaliseArgs(options, callback);
        setLast(name, term, options);
        // slight hack to support my own shortcuts
        options[name] = options.user = term;
        options.search = encodeURIComponent(term);
        if (options.callback) load(getUrl(name, options), options, options.callback);
        return this;
      };
    }
    // makes my code nicer to read when setting up twitterlib object
    return this[name];
  }

  twitterlib = {
    version: '1.0.9', //@version 1.0.9 / Sun Feb 19 23:05:25 2012 +0000
    // search is an exception case
    custom: custom,
    getUrl: getUrl,
    status: function (user, options, callback) { // alias function
      options = normaliseArgs(options, callback);
      options.limit = 1;
      setLast('status', user, options); // setting after limit = 1 to keep this intact
      return this.timeline(user, options, options.callback);
    },
    list: function (list, options, callback) {
      var parts = list.split('/');
      options = normaliseArgs(options, callback);
      setLast('list', list, options);
      options.user = parts[0];
      options.list = parts[1];
      if (options.callback) load(getUrl('list', options), options, options.callback);
      return this;
    },
    next: function () {
      if (last.method) {
        last.page++;
        last.options.page = last.page;
        this[last.method](last.arg, last.options, last.callback);
      } // else we won't do anything
      return this;
    },
    refresh: function () { // same as hitting again
      if (last.method) {
        this[last.method](last.arg, last.options, last.callback);
      } // else we won't do anything
      return this;
    },

    // appending on pre-existing utilities
    time: time,
    ify: ify,
    filter: filter,
    expandLinks: expandLinks,
    cancel: function () {
      for (var k in outstanding) {
        window[k] = (function () { return function (guid) { clean(guid); };})(k.replace('twitterlib', ''));
      }
      outstanding = {};
      return this;
    },
    reset: function () {
      urls = URLS;
      last.method = '';
    },
    render: render,
    debug: function (data) {
      for (var url in data) {
        urls[url] = data[url];
      }
      return this;
    },
    cache: function (enabled) {
      caching = enabled == undefined ? true : enabled;

      // cache is only supported if you have native json encoding
      if (!window.JSON || !window.sessionStorage) {
        caching = false;
      }
    },
    setAccessToken: function (token) {
      this.accessToken = token;
      return this;
    }
  };

  twitterlib.custom('search');
  twitterlib.custom('timeline');
  twitterlib.custom('favs');
  twitterlib.custom('retweets');

  if (typeof exports !== 'undefined') {
    module.exports = twitterlib;
  }

  global.twitterlib = twitterlib;
})(this);
