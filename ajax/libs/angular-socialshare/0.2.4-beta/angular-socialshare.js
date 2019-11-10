/*
 * angular-socialshare
 * 0.2.4-beta
 * 
 * A social urls and content sharing directive for angularjs.
 * http://720kb.githb.io/angular-socialshare
 * 
 * MIT license
 * Mon Feb 08 2016
 */
/*
 * angular-socialshare
 * 0.2.1-beta
 *
 * A social urls and content sharing directive for angularjs.
 * http://720kb.githb.io/angular-socialshare
 *
 * MIT license
 * Thu Feb 04 2016
 */
/*global angular*/
/*eslint no-loop-func:0, func-names:0*/

(function withAngular(angular) {
  'use strict';

  var directiveName = 'socialshare'
    , socialshareProviderNames = ['facebook', 'twitter', 'linkedin', 'google+', 'pinterest', 'tumblr', 'reddit', 'stumbleupon', 'buffer', 'digg', 'delicious', 'vk', 'pocket', 'wordpress', 'flipboard', 'xing', 'hackernews', 'evernote']
    , socialshareConfigurationProvider = /*@ngInject*/ function socialshareConfigurationProvider() {

      var socialshareConfigurationDefault = [{
        'provider': 'facebook',
        'conf': {
            'url':'',
            'text': '',
            'media': '',
            'type': '',
            'via': '',
            'to': '',
            'from': '',
            'ref': '',
            'display': '',
            'source': '',
            'caption': '',
            'redirectUri': '',
            'trigger': 'click',
            'popupHeight': 300,
            'popupWidth': 400
          }
        },
        {
          'provider': 'twitter',
          'conf': {
            'url': '',
            'text': '',
            'via': '',
            'hashtags': '',
            'trigger': 'click',
            'popupHeight': 300,
            'popupWidth': 400
          }
        },
        {
          'provider': 'linkedin',
          'conf': {
            'url': '',
            'text': '',
            'description': '',
            'source': '',
            'trigger': 'click',
            'popupHeight': 300,
            'popupWidth': 400
          }
        },
        {
          'provider': 'reddit',
          'conf': {
            'url': '',
            'text': '',
            'subreddit': '',
            'trigger': 'click',
            'popupHeight': 300,
            'popupWidth': 400
          }
        },
        {
          'provider': 'vk',
          'conf': {
            'url': '',
            'text': '',
            'media': '',
            'trigger': 'click',
            'popupHeight': 300,
            'popupWidth': 400
          }
        },
        {
          'provider': 'digg',
          'conf': {
            'url': '',
            'text': '',
            'media': '',
            'trigger': 'click',
            'popupHeight': 300,
            'popupWidth': 400
          }
        },
        {
          'provider': 'delicious',
          'conf': {
            'url': '',
            'text': '',
            'media': '',
            'trigger': 'click',
            'popupHeight': 300,
            'popupWidth': 400
          }
        },
        {
          'provider': 'stumbleupon',
          'conf': {
            'url': '',
            'text': '',
            'media': '',
            'trigger': 'click',
            'popupHeight': 300,
            'popupWidth': 400
          }
        },
        {
          'provider': 'pinterest',
          'conf': {
            'url': '',
            'text': '',
            'media': '',
            'trigger': 'click',
            'popupHeight': 300,
            'popupWidth': 400
          }
        },
        {
          'provider': 'google+',
          'conf': {
            'url': '',
            'text': '',
            'media': '',
            'trigger': 'click',
            'popupHeight': 300,
            'popupWidth': 400
          }
        },
        {
          'provider': 'tumblr',
          'conf': {
            'url': '',
            'text': '',
            'media': '',
            'trigger': 'click',
            'popupHeight': 300,
            'popupWidth': 400
          }
        },
        {
          'provider': 'buffer',
          'conf': {
            'url': '',
            'text': '',
            'via': '',
            'trigger': 'click',
            'popupHeight': 300,
            'popupWidth': 400
          }
        },
        {
          'provider': 'pocket',
          'conf': {
            'url': '',
            'text': '',
            'trigger': 'click',
            'popupHeight': 300,
            'popupWidth': 400
          }
        },
        {
          'provider': 'flipboard',
          'conf': {
            'url': '',
            'text': '',
            'trigger': 'click',
            'popupHeight': 300,
            'popupWidth': 400
          }
        },
        {
          'provider': 'hackernews',
          'conf': {
            'url': '',
            'text': '',
            'trigger': 'click',
            'popupHeight': 300,
            'popupWidth': 400
          }
        },
        {
          'provider': 'wordpress',
          'conf': {
            'url': '',
            'text': '',
            'media': '',
            'trigger': 'click',
            'popupHeight': 300,
            'popupWidth': 400
          }
        },
        {
          'provider': 'xing',
          'conf': {
            'url': '',
            'text': '',
            'media': '',
            'follow' : '',
            'trigger': 'click',
            'popupHeight': 300,
            'popupWidth': 400
          }
        },
        {
          'provider': 'evernote',
          'conf': {
            'url': '',
            'text': '',
            'trigger': 'click',
            'popupHeight': 300,
            'popupWidth': 400
          }
        }];

      return {
        'configure': function configure(configuration) {

          var configIndex = 0
            , configurationKeys
            , configurationIndex
            , aConfigurationKey
            , configElement
            , internIndex = 0
          //this is necessary becuase provider run before any service
          //so i have to take the log from another injector
          , $log = angular.injector(['ng']).get('$log');

          if (configuration && configuration.length > 0) {
            for (; configIndex < configuration.length; configIndex += 1) {
              if (configuration[configIndex].provider && socialshareProviderNames.indexOf(configuration[configIndex].provider) > -1) {

                for (; internIndex < socialshareConfigurationDefault.length; internIndex += 1) {
                  configElement = socialshareConfigurationDefault[internIndex];

                  if (configElement &&
                    configElement.provider &&
                    configuration[configIndex].provider === configElement.provider) {

                      configurationKeys = Object.keys(configElement.conf);
                      configurationIndex = 0;

                      for (; configurationIndex < configurationKeys.length; configurationIndex += 1) {

                        aConfigurationKey = configurationKeys[configurationIndex];
                        if (aConfigurationKey && configuration[configIndex].conf[aConfigurationKey]) {

                          configElement.conf[aConfigurationKey] = configuration[configIndex].conf[aConfigurationKey];
                        }
                      }
                    }
                  }
                } else {
                  $log.warn('Invalid provider at element ' + configIndex + ' with name:' + configuration[configIndex].provider);
                }
              }
            }
        }
        , '$get': /*@ngInject*/ function instantiateProvider() {

            return socialshareConfigurationDefault;
        }
      };
    }
    , socialshareDirective = /*@ngInject*/ ["$window", "$location", "socialshareConf", "$log", function socialshareDirective($window, $location, socialshareConf, $log) {

      var linkingFunction = function linkingFunction($scope, element, attrs) {

        // observe the values in each of the properties so that if they're updated elsewhere,
        // they are updated in this directive.
        var configurationElement
        , index = 0
        , onEventTriggered = function onEventTriggered() {
          /*eslint-disable no-use-before-define*/
          switch (attrs.socialshareProvider) {
            case 'facebook': {

              facebookShare($window, $location, attrs);
              break;
            }
            case 'google+': {

              googlePlusShare($window, $location, attrs);
              break;
            }
            case 'twitter': {

              twitterShare($window, $location, attrs);
              break;
            }
            case 'stumbleupon': {

              stumbleuponShare($window, $location, attrs);
              break;
            }
            case 'reddit': {

              redditShare($window, $location, attrs);
              break;
            }
            case 'pinterest': {

              pinterestShare($window, $location, attrs);
              break;
            }
            case 'linkedin': {

              linkedinShare($window, $location, attrs);
              break;
            }
            case 'digg': {

              diggShare($window, $location, attrs);
              break;
            }
            case 'tumblr': {

              tumblrShare($window, $location, attrs);
              break;
            }
            case 'delicious': {

              deliciousShare($window, $location, attrs);
              break;
            }
            case 'vk': {

              vkShare($window, $location, attrs);
              break;
            }
            case 'buffer': {

              bufferShare($window, $location, attrs);
              break;
            }
            case 'pocket': {

              pocketShare($window, $location, attrs);
              break;
            }
            case 'wordpress': {

              wordpressShare($window, $location, attrs);
              break;
            }
            case 'flipboard': {

              flipboardShare($window, $location, attrs);
              break;
            }
            case 'hackernews': {

              hackernewsShare($window, $location, attrs);
              break;
            }
            case 'xing': {

              xingShare($window, $location, attrs);
              break;
            }
            case 'evernote': {

              evernoteShare($window, $location, attrs);
              break;
            }
            default: {
              return true;
            }
          }
        };
        /*eslint-enable no-use-before-define*/
        //looking into configuration if there is a config for the current provider
        for (; index < socialshareConf.length; index += 1) {
          if (socialshareConf[index].provider === attrs.socialshareProvider) {
            configurationElement = socialshareConf[index];
            break;
          }
        }

        if (socialshareProviderNames.indexOf(configurationElement.provider) === -1) {
          $log.warn('Invalid Provider Name : ' + attrs.socialshareProvider);
        }

        //if some attribute is not define provide a default one
        attrs.socialshareUrl = attrs.socialshareUrl || configurationElement.conf.url;
        attrs.socialshareText = attrs.socialshareText || configurationElement.conf.text;
        attrs.socialshareMedia = attrs.socialshareMedia || configurationElement.conf.media;
        attrs.socialshareType =  attrs.socialshareType || configurationElement.conf.type;
        attrs.socialshareVia = attrs.socialshareVia || configurationElement.conf.via;
        attrs.socialshareTo =  attrs.socialshareTo || configurationElement.conf.to;
        attrs.socialshareFrom =  attrs.socialshareFrom || configurationElement.conf.from;
        attrs.socialshareRef = attrs.socialshareRef || configurationElement.conf.ref;
        attrs.socialshareDislay = attrs.socialshareDislay || configurationElement.conf.display;
        attrs.socialshareSource = attrs.socialshareSource || configurationElement.conf.source;
        attrs.socialshareCaption = attrs.socialshareCaption || configurationElement.conf.caption;
        attrs.socialshareRedirectUri = attrs.socialshareRedirectUri || configurationElement.conf.redirectUri;
        attrs.socialshareTrigger =  attrs.socialshareTrigger || configurationElement.conf.trigger;
        attrs.socialsharePopupHeight = attrs.socialsharePopupHeight || configurationElement.conf.popupHeight;
        attrs.socialsharePopupWidth = attrs.socialsharePopupWidth || configurationElement.conf.popupWidth;
        attrs.socialshareSubreddit = attrs.socialshareSubreddit || configurationElement.conf.subreddit;
        attrs.socialshareDescription = attrs.socialshareDescription || configurationElement.conf.description;
        attrs.socialshareFollow = attrs.socialshareFollow || configurationElement.conf.follow;
        attrs.socialshareHashtags = attrs.socialshareHashtags || configurationElement.conf.hashtags;

        element.bind(attrs.socialshareTrigger, onEventTriggered);
      };

      return {
        'restrict': 'A',
        'link': linkingFunction
      };
    }]
    , manageFacebookShare = function manageFacebookShare($window, $location, attrs) {
      if (attrs.socialshareType && attrs.socialshareType === 'feed') {
        // if user specifies that they want to use the Facebook feed dialog (https://developers.facebook.com/docs/sharing/reference/feed-dialog/v2.4)
        var urlString = 'https://www.facebook.com/dialog/feed?display=popup';

        if (attrs.socialshareVia) {
          urlString += '&app_id=' + encodeURIComponent(attrs.socialshareVia);
        }

        if (attrs.socialshareRedirectUri) {
          urlString += '&redirect_uri=' + encodeURIComponent(attrs.socialshareRedirectUri);
        }
        if (attrs.socialshareUrl) {
          urlString += '&link=' + encodeURIComponent(attrs.socialshareUrl);
        }

        if (attrs.socialshareTo) {
          urlString += '&to=' + encodeURIComponent(attrs.socialshareTo);
        }

        if (attrs.socialshareDisplay) {
          urlString += '&display=' + encodeURIComponent(attrs.socialshareDisplay);
        }

        if (attrs.socialshareRef) {
          urlString += '&ref=' + encodeURIComponent(attrs.socialshareRef);
        }

        if (attrs.socialshareFrom) {
          urlString += '&from=' + encodeURIComponent(attrs.socialshareFrom);
        }

        if (attrs.socialshareDescription) {
          urlString += '&description=' + encodeURIComponent(attrs.socialshareDescription);
        }

        if (attrs.socialshareText) {
          urlString += '&name=' + encodeURIComponent(attrs.socialshareText);
        }

        if (attrs.socialshareCaption) {
          urlString += '&caption=' + encodeURIComponent(attrs.socialshareCaption);
        }

        if (attrs.socialshareMedia) {
          urlString += '&picture=' + encodeURIComponent(attrs.socialshareMedia);
        }

        if (attrs.socialshareSource) {
          urlString += '&source=' + encodeURIComponent(attrs.socialshareSource);
        }

        $window.open(
          urlString,
          'sharer', 'toolbar=0,status=0,width=' + attrs.socialsharePopupWidth + ',height=' + attrs.socialsharePopupHeight
          + ',top=' + ($window.innerHeight - attrs.socialsharePopupHeight) / 2 + ',left=' + ($window.innerWidth - attrs.socialsharePopupWidth) / 2);

      } else {
        //otherwise default to using sharer.php
        $window.open(
          'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(attrs.socialshareUrl || $location.absUrl())
          , 'sharer', 'toolbar=0,status=0,width=' + attrs.socialsharePopupWidth + ',height=' + attrs.socialsharePopupHeight
          + ',top=' + ($window.innerHeight - attrs.socialsharePopupHeight) / 2 + ',left=' + ($window.innerWidth - attrs.socialsharePopupWidth) / 2);
      }
    }
    , manageTwitterShare = function manageTwitterShare($window, $location, attrs) {
      var urlString = 'https://www.twitter.com/intent/tweet?';

      if (attrs.socialshareText) {
        urlString += 'text=' + encodeURIComponent(attrs.socialshareText);
      }

      if (attrs.socialshareVia) {
        urlString += '&via=' + encodeURIComponent(attrs.socialshareVia);
      }

      if (attrs.socialshareHashtags) {
        urlString += '&hashtags=' + encodeURIComponent(attrs.socialshareHashtags);
      }

      //default to the current page if a URL isn't specified
      urlString += '&url=' + encodeURIComponent(attrs.socialshareUrl || $location.absUrl());

      $window.open(
        urlString,
        'sharer', 'toolbar=0,status=0,width=' + attrs.socialsharePopupWidth + ',height=' + attrs.socialsharePopupHeight
        + ',top=' + ($window.innerHeight - attrs.socialsharePopupHeight) / 2 + ',left=' + ($window.innerWidth - attrs.socialsharePopupWidth) / 2);
    }
    , manageGooglePlusShare = function manageGooglePlusShare($window, $location, attrs) {

      $window.open(
        'https://plus.google.com/share?url=' + encodeURIComponent(attrs.socialshareUrl || $location.absUrl())
        , 'sharer', 'toolbar=0,status=0,width=' + attrs.socialsharePopupWidth + ',height=' + attrs.socialsharePopupHeight
        + ',top=' + ($window.innerHeight - attrs.socialsharePopupHeight) / 2 + ',left=' + ($window.innerWidth - attrs.socialsharePopupWidth) / 2);
      }
    , manageRedditShare = function manageRedditShare($window, $location, attrs) {
      var urlString = 'https://www.reddit.com/';

      if (attrs.socialshareSubreddit) {
        urlString += 'r/' + attrs.socialshareSubreddit + '/submit?url=';
      } else {
        urlString += 'submit?url=';
      }
      /*-
      * Reddit isn't responsive and at default width for our popups (500 x 500), everything is messed up.
      * So, overriding the width if it is less than 900 (played around to settle on this) and height if
      * it is less than 650px.
      */
      if (attrs.socialsharePopupWidth < 900) {
        attrs.socialsharePopupWidth = 900;
      }

      if (attrs.socialsharePopupHeight < 650) {
        attrs.socialsharePopupHeight = 650;
      }

      $window.open(
        urlString + encodeURIComponent(attrs.socialshareUrl || $location.absUrl()) + '&title=' + encodeURIComponent(attrs.socialshareText)
        , 'sharer', 'toolbar=0,status=0,width=' + attrs.socialsharePopupWidth + ',height=' + attrs.socialsharePopupHeight
        + ',top=' + ($window.innerHeight - attrs.socialsharePopupHeight) / 2 + ',left=' + ($window.innerWidth - attrs.socialsharePopupWidth) / 2);
      }
    , manageStumbleuponShare = function manageStumbleuponShare($window, $location, attrs) {

      $window.open(
        'https://www.stumbleupon.com/submit?url=' + encodeURIComponent(attrs.socialshareUrl || $location.absUrl()) + '&title=' + encodeURIComponent(attrs.socialshareText)
        , 'sharer', 'toolbar=0,status=0,width=' + attrs.socialsharePopupWidth + ',height=' + attrs.socialsharePopupHeight
        + ',top=' + ($window.innerHeight - attrs.socialsharePopupHeight) / 2 + ',left=' + ($window.innerWidth - attrs.socialsharePopupWidth) / 2);
    }
    , manageLinkedinShare = function manageLinkedinShare($window, $location, attrs) {
      /*
      * Refer: https://developer.linkedin.com/docs/share-on-linkedin
      * Tab: Customized URL
      */
      var urlString = 'https://www.linkedin.com/shareArticle?mini=true';

      urlString += '&url=' + encodeURIComponent(attrs.socialshareUrl || $location.absUrl());

      if (attrs.socialshareText) {
        urlString += '&title=' + encodeURIComponent(attrs.socialshareText);
      }

      if (attrs.socialshareDescription) {
        urlString += '&summary=' + encodeURIComponent(attrs.socialshareDescription);
      }

      if (attrs.socialshareSource) {
        urlString += '&source=' + encodeURIComponent(attrs.socialshareSource);
      }

      $window.open(
        urlString,
        'sharer', 'toolbar=0,status=0,width=' + attrs.socialsharePopupWidth + ',height=' + attrs.socialsharePopupHeight
        + ',top=' + ($window.innerHeight - attrs.socialsharePopupHeight) / 2 + ',left=' + ($window.innerWidth - attrs.socialsharePopupWidth) / 2);
    }
    , managePinterestShare = function managePinterestShare($window, $location, attrs) {

      $window.open(
        'https://www.pinterest.com/pin/create/button/?url=' + encodeURIComponent(attrs.socialshareUrl || $location.absUrl()) + '&media=' + encodeURIComponent(attrs.socialshareMedia) + '&description=' + encodeURIComponent(attrs.socialshareText)
        , 'sharer', 'toolbar=0,status=0,width=' + attrs.socialsharePopupWidth + ',height=' + attrs.socialsharePopupHeight
        + ',top=' + ($window.innerHeight - attrs.socialsharePopupHeight) / 2 + ',left=' + ($window.innerWidth - attrs.socialsharePopupWidth) / 2);
    }
    , manageDiggShare = function manageDiggShare($window, $location, attrs) {

      $window.open(
        'https://www.digg.com/submit?url=' + encodeURIComponent(attrs.socialshareUrl || $location.absUrl()) + '&title=' + encodeURIComponent(attrs.socialshareText)
        , 'sharer', 'toolbar=0,status=0,width=' + attrs.socialsharePopupWidth + ',height=' + attrs.socialsharePopupHeight
        + ',top=' + ($window.innerHeight - attrs.socialsharePopupHeight) / 2 + ',left=' + ($window.innerWidth - attrs.socialsharePopupWidth) / 2);
    }
    , manageTumblrShare = function manageTumblrShare($window, $location, attrs) {

      if (attrs.socialshareMedia) {
        var urlString = 'https://www.tumblr.com/share/photo?source=' + encodeURIComponent(attrs.socialshareMedia);

        if (attrs.socialshareText) {
          urlString += '&caption=' + encodeURIComponent(attrs.socialshareText);
        }

        $window.open(
          urlString,
          'sharer', 'toolbar=0,status=0,width=' + attrs.socialsharePopupWidth + ',height=' + attrs.socialsharePopupHeight
          + ',top=' + ($window.innerHeight - attrs.socialsharePopupHeight) / 2 + ',left=' + ($window.innerWidth - attrs.socialsharePopupWidth) / 2);
      } else {

        $window.open(
          'https://www.tumblr.com/share/link?url=' + encodeURIComponent(attrs.socialshareUrl) + '&description=' + encodeURIComponent(attrs.socialshareText)
          , 'sharer', 'toolbar=0,status=0,width=' + attrs.socialsharePopupWidth + ',height=' + attrs.socialsharePopupHeight
          + ',top=' + ($window.innerHeight - attrs.socialsharePopupHeight) / 2 + ',left=' + ($window.innerWidth - attrs.socialsharePopupWidth) / 2);
      }
    }
    , manageVkShare = function manageVkShare($window, $location, attrs) {

     $window.open(
       'https://www.vk.com/share.php?url=' + encodeURIComponent(attrs.socialshareUrl || $location.absUrl())
       , 'sharer', 'toolbar=0,status=0,width=' + attrs.socialsharePopupWidth + ',height=' + attrs.socialsharePopupHeight
       + ',top=' + ($window.innerHeight - attrs.socialsharePopupHeight) / 2 + ',left=' + ($window.innerWidth - attrs.socialsharePopupWidth) / 2);
    }
    , manageDeliciousShare = function manageDeliciousShare($window, $location, attrs) {

     $window.open(
       'https://www.delicious.com/save?v=5&noui&jump=close&url=' + encodeURIComponent(attrs.socialshareUrl || $location.absUrl()) + '&title=' + encodeURIComponent(attrs.socialshareText)
       , 'sharer', 'toolbar=0,status=0,width=' + attrs.socialsharePopupWidth + ',height=' + attrs.socialsharePopupHeight
       + ',top=' + ($window.innerHeight - attrs.socialsharePopupHeight) / 2 + ',left=' + ($window.innerWidth - attrs.socialsharePopupWidth) / 2);
    }
    , manageBufferShare = function manageBufferShare($window, $location, attrs) {
      var urlString = 'https://bufferapp.com/add?';

      if (attrs.socialshareText) {
        urlString += 'text=' + encodeURIComponent(attrs.socialshareText);
      }

      if (attrs.socialshareVia) {
        urlString += '&via=' + encodeURIComponent(attrs.socialshareVia);
      }

      //default to the current page if a URL isn't specified
      urlString += '&url=' + encodeURIComponent(attrs.socialshareUrl || $location.absUrl());

      $window.open(
        urlString,
        'sharer', 'toolbar=0,status=0,width=' + attrs.socialsharePopupWidth + ',height=' + attrs.socialsharePopupHeight
        + ',top=' + ($window.innerHeight - attrs.socialsharePopupHeight) / 2 + ',left=' + ($window.innerWidth - attrs.socialsharePopupWidth) / 2);
    }
    , manageHackernewsShare = function manageHackernewsShare($window, $location, attrs) {
      var urlString = 'https://news.ycombinator.com/submitlink?';

      if (attrs.socialshareText) {
        urlString += 't=' + encodeURIComponent(attrs.socialshareText) + '&';
      }
      //default to the current page if a URL isn't specified
      urlString += 'u=' + encodeURIComponent(attrs.socialshareUrl || $location.absUrl());

      $window.open(
       urlString,
       'sharer', 'toolbar=0,status=0,width=' + attrs.socialsharePopupWidth + ',height=' + attrs.socialsharePopupHeight
      + ',top=' + ($window.innerHeight - attrs.socialsharePopupHeight) / 2 + ',left=' + ($window.innerWidth - attrs.socialsharePopupWidth) / 2);
    }
    , manageFlipboardShare = function manageFlipboardShare($window, $location, attrs) {
      var urlString = 'https://share.flipboard.com/bookmarklet/popout?v=2&';

      if (attrs.socialshareText) {
        urlString += 'title=' + encodeURIComponent(attrs.socialshareText) + '&';
      }

      //default to the current page if a URL isn't specified
      urlString += 'url=' + encodeURIComponent(attrs.socialshareUrl || $location.absUrl());

      $window.open(
        urlString,
        'sharer', 'toolbar=0,status=0,width=' + attrs.socialsharePopupWidth + ',height=' + attrs.socialsharePopupHeight
        + ',top=' + ($window.innerHeight - attrs.socialsharePopupHeight) / 2 + ',left=' + ($window.innerWidth - attrs.socialsharePopupWidth) / 2);
    }
    , managePocketShare = function managePocketShare($window, $location, attrs) {
      var urlString = 'https://getpocket.com/save?';

      if (attrs.socialshareText) {
        urlString += 'text=' + encodeURIComponent(attrs.socialshareText) + '&';
      }

      //default to the current page if a URL isn't specified
      urlString += 'url=' + encodeURIComponent(attrs.socialshareUrl || $location.absUrl());

      $window.open(
        urlString,
        'sharer', 'toolbar=0,status=0,width=' + attrs.socialsharePopupWidth + ',height=' + attrs.socialsharePopupHeight
        + ',top=' + ($window.innerHeight - attrs.socialsharePopupHeight) / 2 + ',left=' + ($window.innerWidth - attrs.socialsharePopupWidth) / 2);
    }
    , manageWordpressShare = function manageWordpressShare($window, $location, attrs) {
      var urlString = 'http://wordpress.com/press-this.php?';

      if (attrs.socialshareText) {
        urlString += 't=' + encodeURIComponent(attrs.socialshareText) + '&';
      }
      if (attrs.socialshareMedia) {
        urlString += 'i=' + encodeURIComponent(attrs.socialshareMedia) + '&';
      }

      //default to the current page if a URL isn't specified
      urlString += 'u=' + encodeURIComponent(attrs.socialshareUrl || $location.absUrl());

      $window.open(
        urlString,
        'sharer', 'toolbar=0,status=0,width=' + attrs.socialsharePopupWidth + ',height=' + attrs.socialsharePopupHeight
        + ',top=' + ($window.innerHeight - attrs.socialsharePopupHeight) / 2 + ',left=' + ($window.innerWidth - attrs.socialsharePopupWidth) / 2);
    }
    , manageXingShare = function manageXingShare($window, $location, attrs) {
      var followUrl = '';

      if (attrs.socialshareFollow) {
        followUrl = '&follow_url=' + encodeURIComponent(attrs.socialshareFollow);
      }
      $window.open(
        'https://www.xing.com/spi/shares/new?url=' + encodeURIComponent(attrs.socialshareUrl || $location.absUrl()) + followUrl
        , 'sharer', 'toolbar=0,status=0,width=' + attrs.socialsharePopupWidth + ',height=' + attrs.socialsharePopupHeight
        + ',top=' + ($window.innerHeight - attrs.socialsharePopupHeight) / 2 + ',left=' + ($window.innerWidth - attrs.socialsharePopupWidth) / 2);
    }
    , manageEvernoteShare = function manageEvernoteShare($window, $location, attrs) {

      var urlString = 'http://www.evernote.com/clip.action?url=' + encodeURIComponent(attrs.socialshareUrl || $location.absUrl());

      if (attrs.socialshareText) {
        urlString += '&title=' + encodeURIComponent(attrs.socialshareText);
      }

      $window.open(
        urlString
        , 'sharer', 'toolbar=0,status=0,width=' + attrs.socialsharePopupWidth + ',height=' + attrs.socialsharePopupHeight
        + ',top=' + ($window.innerHeight - attrs.socialsharePopupHeight) / 2 + ',left=' + ($window.innerWidth - attrs.socialsharePopupWidth) / 2);
    }
    , facebookShare = manageFacebookShare
    , twitterShare = manageTwitterShare
    , googlePlusShare = manageGooglePlusShare
    , redditShare = manageRedditShare
    , stumbleuponShare = manageStumbleuponShare
    , linkedinShare = manageLinkedinShare
    , pinterestShare = managePinterestShare
    , diggShare = manageDiggShare
    , tumblrShare = manageTumblrShare
    , vkShare = manageVkShare
    , deliciousShare = manageDeliciousShare
    , bufferShare = manageBufferShare
    , hackernewsShare = manageHackernewsShare
    , flipboardShare = manageFlipboardShare
    , pocketShare = managePocketShare
    , wordpressShare = manageWordpressShare
    , xingShare = manageXingShare
    , evernoteShare = manageEvernoteShare;


  angular.module('720kb.socialshare', [])
  .provider(directiveName + 'Conf', socialshareConfigurationProvider)
  .directive(directiveName, socialshareDirective);
}(angular));
