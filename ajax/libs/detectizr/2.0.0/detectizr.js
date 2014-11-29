



<!DOCTYPE html>
<html lang="en" class="   ">
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# object: http://ogp.me/ns/object# article: http://ogp.me/ns/article# profile: http://ogp.me/ns/profile#">
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Language" content="en">
    
    
    <title>Detectizr/detectizr.js at master · barisaydinoglu/Detectizr</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub">
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub">
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-114.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-144.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144.png">
    <meta property="fb:app_id" content="1401488693436528">

      <meta content="@github" name="twitter:site" /><meta content="summary" name="twitter:card" /><meta content="barisaydinoglu/Detectizr" name="twitter:title" /><meta content="Detectizr - A Modernizr extension to detect device, device model, screen size, operating system, and browser details" name="twitter:description" /><meta content="https://avatars2.githubusercontent.com/u/900545?v=2&amp;s=400" name="twitter:image:src" />
<meta content="GitHub" property="og:site_name" /><meta content="object" property="og:type" /><meta content="https://avatars2.githubusercontent.com/u/900545?v=2&amp;s=400" property="og:image" /><meta content="barisaydinoglu/Detectizr" property="og:title" /><meta content="https://github.com/barisaydinoglu/Detectizr" property="og:url" /><meta content="Detectizr - A Modernizr extension to detect device, device model, screen size, operating system, and browser details" property="og:description" />

    <link rel="assets" href="https://assets-cdn.github.com/">
    <link rel="conduit-xhr" href="https://ghconduit.com:25035">
    <link rel="xhr-socket" href="/_sockets">

    <meta name="msapplication-TileImage" content="/windows-tile.png">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="selected-link" value="repo_source" data-pjax-transient>
      <meta name="google-analytics" content="UA-3769691-2">

    <meta content="collector.githubapp.com" name="octolytics-host" /><meta content="collector-cdn.github.com" name="octolytics-script-host" /><meta content="github" name="octolytics-app-id" /><meta content="C3611E97:6A4A:193EB8C6:54084D58" name="octolytics-dimension-request_id" /><meta content="803983" name="octolytics-actor-id" /><meta content="mxa055" name="octolytics-actor-login" /><meta content="a42c0130ee8cef1af93552875d3aa29275323d6ff062d7b1a5b9a00fbed6c3ee" name="octolytics-actor-hash" />
    

    
    
    <link rel="icon" type="image/x-icon" href="https://assets-cdn.github.com/favicon.ico">


    <meta content="authenticity_token" name="csrf-param" />
<meta content="fmpCrk7RxwXDMeSeCD/iKeLYPQADXDb81GNQFwNIdToNmhSUf+AgrWtfZ+ofW3f4bY31qQcxyqqlrfrSzqxB4A==" name="csrf-token" />

    <link href="https://assets-cdn.github.com/assets/github-c0c2293be58dbb87efbe15f0252a75aa7f738724.css" media="all" rel="stylesheet" type="text/css" />
    <link href="https://assets-cdn.github.com/assets/github2-2c7d4f87e135381585a949e74aa65d44cca0232f.css" media="all" rel="stylesheet" type="text/css" />
    


    <meta http-equiv="x-pjax-version" content="62537849d5f6d9949c1a651bcb33b773">

      
  <meta name="description" content="Detectizr - A Modernizr extension to detect device, device model, screen size, operating system, and browser details">
  <meta name="go-import" content="github.com/barisaydinoglu/Detectizr git https://github.com/barisaydinoglu/Detectizr.git">

  <meta content="900545" name="octolytics-dimension-user_id" /><meta content="barisaydinoglu" name="octolytics-dimension-user_login" /><meta content="4248810" name="octolytics-dimension-repository_id" /><meta content="barisaydinoglu/Detectizr" name="octolytics-dimension-repository_nwo" /><meta content="true" name="octolytics-dimension-repository_public" /><meta content="false" name="octolytics-dimension-repository_is_fork" /><meta content="4248810" name="octolytics-dimension-repository_network_root_id" /><meta content="barisaydinoglu/Detectizr" name="octolytics-dimension-repository_network_root_nwo" />
  <link href="https://github.com/barisaydinoglu/Detectizr/commits/master.atom" rel="alternate" title="Recent Commits to Detectizr:master" type="application/atom+xml">

  </head>


  <body class="logged_in  env-production windows vis-public page-blob">
    <a href="#start-of-content" tabindex="1" class="accessibility-aid js-skip-to-content">Skip to content</a>
    <div class="wrapper">
      
      
      
      


      <div class="header header-logged-in true">
  <div class="container clearfix">

    <a class="header-logo-invertocat" href="https://github.com/" aria-label="Homepage" ga-data-click="Header, go to dashboard, icon:logo">
  <span class="mega-octicon octicon-mark-github"></span>
</a>


      <div class="site-search repo-scope js-site-search">
          <form accept-charset="UTF-8" action="/barisaydinoglu/Detectizr/search" class="js-site-search-form" data-global-search-url="/search" data-repo-search-url="/barisaydinoglu/Detectizr/search" method="get"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /></div>
  <input type="text"
    class="js-site-search-field is-clearable"
    data-hotkey="s"
    name="q"
    placeholder="Search"
    data-global-scope-placeholder="Search GitHub"
    data-repo-scope-placeholder="Search"
    tabindex="1"
    autocapitalize="off">
  <div class="scope-badge">This repository</div>
</form>
      </div>
      <ul class="header-nav left">
        <li class="header-nav-item explore">
          <a class="header-nav-link" href="/explore" data-ga-click="Header, go to explore, text:explore">Explore</a>
        </li>
          <li class="header-nav-item">
            <a class="header-nav-link" href="https://gist.github.com" data-ga-click="Header, go to gist, text:gist">Gist</a>
          </li>
          <li class="header-nav-item">
            <a class="header-nav-link" href="/blog" data-ga-click="Header, go to blog, text:blog">Blog</a>
          </li>
        <li class="header-nav-item">
          <a class="header-nav-link" href="https://help.github.com" data-ga-click="Header, go to help, text:help">Help</a>
        </li>
      </ul>

    
<ul class="header-nav user-nav right" id="user-links">
  <li class="header-nav-item dropdown js-menu-container">
    <a class="header-nav-link name" href="/mxa055" data-ga-click="Header, go to profile, text:username">
      <img alt="Michael" class="avatar" data-user="803983" height="20" src="https://avatars3.githubusercontent.com/u/803983?v=2&amp;s=40" width="20" />
      <span class="css-truncate">
        <span class="css-truncate-target">mxa055</span>
      </span>
    </a>
  </li>

  <li class="header-nav-item dropdown js-menu-container">
    <a class="header-nav-link js-menu-target tooltipped tooltipped-s" href="#" aria-label="Create new..." data-ga-click="Header, create new, icon:add">
      <span class="octicon octicon-plus"></span>
      <span class="dropdown-caret"></span>
    </a>

    <div class="dropdown-menu-content js-menu-content">
      
<ul class="dropdown-menu">
  <li>
    <a href="/new"><span class="octicon octicon-repo"></span> New repository</a>
  </li>
  <li>
    <a href="/organizations/new"><span class="octicon octicon-organization"></span> New organization</a>
  </li>


    <li class="dropdown-divider"></li>
    <li class="dropdown-header">
      <span title="barisaydinoglu/Detectizr">This repository</span>
    </li>
      <li>
        <a href="/barisaydinoglu/Detectizr/issues/new"><span class="octicon octicon-issue-opened"></span> New issue</a>
      </li>
</ul>

    </div>
  </li>

  <li class="header-nav-item">
        <a href="/notifications" aria-label="You have unread notifications" class="header-nav-link notification-indicator tooltipped tooltipped-s" data-ga-click="Header, go to notifications, icon:unread" data-hotkey="g n">
        <span class="mail-status unread"></span>
        <span class="octicon octicon-inbox"></span>
</a>
  </li>

  <li class="header-nav-item">
    <a class="header-nav-link tooltipped tooltipped-s" href="/settings/profile" id="account_settings" aria-label="Settings" data-ga-click="Header, go to settings, icon:settings">
      <span class="octicon octicon-gear"></span>
    </a>
  </li>

  <li class="header-nav-item">
    <form accept-charset="UTF-8" action="/logout" class="logout-form" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="p89CNahovSzhj2lQI2vE9jOnV+gbYManCOB8EGSeZ50XdgXJCD1lOPRHDEYrf/SYlSvmfh5l32RQ8ge0z3hl5g==" /></div>
      <button class="header-nav-link sign-out-button tooltipped tooltipped-s" aria-label="Sign out" data-ga-click="Header, sign out, icon:logout">
        <span class="octicon octicon-sign-out"></span>
      </button>
</form>  </li>

</ul>


    
  </div>
</div>

      

        


      <div id="start-of-content" class="accessibility-aid"></div>
          <div class="site" itemscope itemtype="http://schema.org/WebPage">
    <div id="js-flash-container">
      
    </div>
    <div class="pagehead repohead instapaper_ignore readability-menu">
      <div class="container">
        
<ul class="pagehead-actions">

    <li class="subscription">
      <form accept-charset="UTF-8" action="/notifications/subscribe" class="js-social-container" data-autosubmit="true" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="qRZFTn8Jfd1KgDATgHl+V5LcrQ0ClmYTSaB91nEdZjnP3gELaTgkYzs5pm+jxLN9D5eWPdzPMl+WacDgQSplzA==" /></div>  <input id="repository_id" name="repository_id" type="hidden" value="4248810" />

    <div class="select-menu js-menu-container js-select-menu">
      <a class="social-count js-social-count" href="/barisaydinoglu/Detectizr/watchers">
        20
      </a>
      <a href="/barisaydinoglu/Detectizr/subscription"
        class="minibutton select-menu-button with-count js-menu-target" role="button" tabindex="0" aria-haspopup="true">
        <span class="js-select-button">
          <span class="octicon octicon-eye"></span>
          Watch
        </span>
      </a>

      <div class="select-menu-modal-holder">
        <div class="select-menu-modal subscription-menu-modal js-menu-content" aria-hidden="true">
          <div class="select-menu-header">
            <span class="select-menu-title">Notifications</span>
            <span class="octicon octicon-x js-menu-close" role="button" aria-label="Close"></span>
          </div> <!-- /.select-menu-header -->

          <div class="select-menu-list js-navigation-container" role="menu">

            <div class="select-menu-item js-navigation-item selected" role="menuitem" tabindex="0">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <div class="select-menu-item-text">
                <input checked="checked" id="do_included" name="do" type="radio" value="included" />
                <h4>Not watching</h4>
                <span class="description">Be notified when participating or @mentioned.</span>
                <span class="js-select-button-text hidden-select-button-text">
                  <span class="octicon octicon-eye"></span>
                  Watch
                </span>
              </div>
            </div> <!-- /.select-menu-item -->

            <div class="select-menu-item js-navigation-item " role="menuitem" tabindex="0">
              <span class="select-menu-item-icon octicon octicon octicon-check"></span>
              <div class="select-menu-item-text">
                <input id="do_subscribed" name="do" type="radio" value="subscribed" />
                <h4>Watching</h4>
                <span class="description">Be notified of all conversations.</span>
                <span class="js-select-button-text hidden-select-button-text">
                  <span class="octicon octicon-eye"></span>
                  Unwatch
                </span>
              </div>
            </div> <!-- /.select-menu-item -->

            <div class="select-menu-item js-navigation-item " role="menuitem" tabindex="0">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <div class="select-menu-item-text">
                <input id="do_ignore" name="do" type="radio" value="ignore" />
                <h4>Ignoring</h4>
                <span class="description">Never be notified.</span>
                <span class="js-select-button-text hidden-select-button-text">
                  <span class="octicon octicon-mute"></span>
                  Stop ignoring
                </span>
              </div>
            </div> <!-- /.select-menu-item -->

          </div> <!-- /.select-menu-list -->

        </div> <!-- /.select-menu-modal -->
      </div> <!-- /.select-menu-modal-holder -->
    </div> <!-- /.select-menu -->

</form>
    </li>

  <li>
    
  <div class="js-toggler-container js-social-container starring-container ">

    <form accept-charset="UTF-8" action="/barisaydinoglu/Detectizr/unstar" class="js-toggler-form starred js-unstar-button" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="VLFcmBdlkvVIsby37PpCGfb078zyS8hu5nEo0dIHeqsrm1uM4Y99OeLxh310s9TzDQU8FS8nM1LCNVYbFx5Y3g==" /></div>
      <button
        class="minibutton with-count js-toggler-target star-button"
        aria-label="Unstar this repository" title="Unstar barisaydinoglu/Detectizr">
        <span class="octicon octicon-star"></span>
        Unstar
      </button>
        <a class="social-count js-social-count" href="/barisaydinoglu/Detectizr/stargazers">
          137
        </a>
</form>
    <form accept-charset="UTF-8" action="/barisaydinoglu/Detectizr/star" class="js-toggler-form unstarred js-star-button" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="wtzY7kb6wbGdgv/+EYiui0zT/E+d07lHxEoMHdayF5Gm6VrDd4xrUo3+WH4yPancZBlq7GDl4K3opM6b4hEQvQ==" /></div>
      <button
        class="minibutton with-count js-toggler-target star-button"
        aria-label="Star this repository" title="Star barisaydinoglu/Detectizr">
        <span class="octicon octicon-star"></span>
        Star
      </button>
        <a class="social-count js-social-count" href="/barisaydinoglu/Detectizr/stargazers">
          137
        </a>
</form>  </div>

  </li>


        <li>
          <a href="/barisaydinoglu/Detectizr/fork" class="minibutton with-count js-toggler-target fork-button tooltipped-n" title="Fork your own copy of barisaydinoglu/Detectizr to your account" aria-label="Fork your own copy of barisaydinoglu/Detectizr to your account" rel="facebox nofollow">
            <span class="octicon octicon-repo-forked"></span>
            Fork
          </a>
          <a href="/barisaydinoglu/Detectizr/network" class="social-count">33</a>
        </li>

</ul>

        <h1 itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="entry-title public">
          <span class="mega-octicon octicon-repo"></span>
          <span class="author"><a href="/barisaydinoglu" class="url fn" itemprop="url" rel="author"><span itemprop="title">barisaydinoglu</span></a></span><!--
       --><span class="path-divider">/</span><!--
       --><strong><a href="/barisaydinoglu/Detectizr" class="js-current-repository js-repo-home-link">Detectizr</a></strong>

          <span class="page-context-loader">
            <img alt="" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
          </span>

        </h1>
      </div><!-- /.container -->
    </div><!-- /.repohead -->

    <div class="container">
      <div class="repository-with-sidebar repo-container new-discussion-timeline  ">
        <div class="repository-sidebar clearfix">
            
<div class="sunken-menu vertical-right repo-nav js-repo-nav js-repository-container-pjax js-octicon-loaders" data-issue-count-url="/barisaydinoglu/Detectizr/issues/counts">
  <div class="sunken-menu-contents">
    <ul class="sunken-menu-group">
      <li class="tooltipped tooltipped-w" aria-label="Code">
        <a href="/barisaydinoglu/Detectizr" aria-label="Code" class="selected js-selected-navigation-item sunken-menu-item" data-hotkey="g c" data-pjax="true" data-selected-links="repo_source repo_downloads repo_commits repo_releases repo_tags repo_branches /barisaydinoglu/Detectizr">
          <span class="octicon octicon-code"></span> <span class="full-word">Code</span>
          <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

        <li class="tooltipped tooltipped-w" aria-label="Issues">
          <a href="/barisaydinoglu/Detectizr/issues" aria-label="Issues" class="js-selected-navigation-item sunken-menu-item js-disable-pjax" data-hotkey="g i" data-selected-links="repo_issues repo_labels repo_milestones /barisaydinoglu/Detectizr/issues">
            <span class="octicon octicon-issue-opened"></span> <span class="full-word">Issues</span>
            <span class="js-issue-replace-counter"></span>
            <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>        </li>

      <li class="tooltipped tooltipped-w" aria-label="Pull Requests">
        <a href="/barisaydinoglu/Detectizr/pulls" aria-label="Pull Requests" class="js-selected-navigation-item sunken-menu-item js-disable-pjax" data-hotkey="g p" data-selected-links="repo_pulls /barisaydinoglu/Detectizr/pulls">
            <span class="octicon octicon-git-pull-request"></span> <span class="full-word">Pull Requests</span>
            <span class="js-pull-replace-counter"></span>
            <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>


        <li class="tooltipped tooltipped-w" aria-label="Wiki">
          <a href="/barisaydinoglu/Detectizr/wiki" aria-label="Wiki" class="js-selected-navigation-item sunken-menu-item js-disable-pjax" data-hotkey="g w" data-selected-links="repo_wiki /barisaydinoglu/Detectizr/wiki">
            <span class="octicon octicon-book"></span> <span class="full-word">Wiki</span>
            <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>        </li>
    </ul>
    <div class="sunken-menu-separator"></div>
    <ul class="sunken-menu-group">

      <li class="tooltipped tooltipped-w" aria-label="Pulse">
        <a href="/barisaydinoglu/Detectizr/pulse/weekly" aria-label="Pulse" class="js-selected-navigation-item sunken-menu-item" data-pjax="true" data-selected-links="pulse /barisaydinoglu/Detectizr/pulse/weekly">
          <span class="octicon octicon-pulse"></span> <span class="full-word">Pulse</span>
          <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

      <li class="tooltipped tooltipped-w" aria-label="Graphs">
        <a href="/barisaydinoglu/Detectizr/graphs" aria-label="Graphs" class="js-selected-navigation-item sunken-menu-item" data-pjax="true" data-selected-links="repo_graphs repo_contributors /barisaydinoglu/Detectizr/graphs">
          <span class="octicon octicon-graph"></span> <span class="full-word">Graphs</span>
          <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>
    </ul>


  </div>
</div>

              <div class="only-with-full-nav">
                
  
<div class="clone-url open"
  data-protocol-type="http"
  data-url="/users/set_protocol?protocol_selector=http&amp;protocol_type=clone">
  <h3><span class="text-emphasized">HTTPS</span> clone URL</h3>
  <div class="input-group">
    <input type="text" class="input-mini input-monospace js-url-field"
           value="https://github.com/barisaydinoglu/Detectizr.git" readonly="readonly">
    <span class="input-group-button">
      <button aria-label="Copy to clipboard" class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="https://github.com/barisaydinoglu/Detectizr.git" data-copied-hint="Copied!" type="button"><span class="octicon octicon-clippy"></span></button>
    </span>
  </div>
</div>

  
<div class="clone-url "
  data-protocol-type="ssh"
  data-url="/users/set_protocol?protocol_selector=ssh&amp;protocol_type=clone">
  <h3><span class="text-emphasized">SSH</span> clone URL</h3>
  <div class="input-group">
    <input type="text" class="input-mini input-monospace js-url-field"
           value="git@github.com:barisaydinoglu/Detectizr.git" readonly="readonly">
    <span class="input-group-button">
      <button aria-label="Copy to clipboard" class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="git@github.com:barisaydinoglu/Detectizr.git" data-copied-hint="Copied!" type="button"><span class="octicon octicon-clippy"></span></button>
    </span>
  </div>
</div>

  
<div class="clone-url "
  data-protocol-type="subversion"
  data-url="/users/set_protocol?protocol_selector=subversion&amp;protocol_type=clone">
  <h3><span class="text-emphasized">Subversion</span> checkout URL</h3>
  <div class="input-group">
    <input type="text" class="input-mini input-monospace js-url-field"
           value="https://github.com/barisaydinoglu/Detectizr" readonly="readonly">
    <span class="input-group-button">
      <button aria-label="Copy to clipboard" class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="https://github.com/barisaydinoglu/Detectizr" data-copied-hint="Copied!" type="button"><span class="octicon octicon-clippy"></span></button>
    </span>
  </div>
</div>


<p class="clone-options">You can clone with
      <a href="#" class="js-clone-selector" data-protocol="http">HTTPS</a>,
      <a href="#" class="js-clone-selector" data-protocol="ssh">SSH</a>,
      or <a href="#" class="js-clone-selector" data-protocol="subversion">Subversion</a>.
  <a href="https://help.github.com/articles/which-remote-url-should-i-use" class="help tooltipped tooltipped-n" aria-label="Get help on which URL is right for you.">
    <span class="octicon octicon-question"></span>
  </a>
</p>


  <a href="github-windows://openRepo/https://github.com/barisaydinoglu/Detectizr" class="minibutton sidebar-button" title="Save barisaydinoglu/Detectizr to your computer and use it in GitHub Desktop." aria-label="Save barisaydinoglu/Detectizr to your computer and use it in GitHub Desktop.">
    <span class="octicon octicon-device-desktop"></span>
    Clone in Desktop
  </a>

                <a href="/barisaydinoglu/Detectizr/archive/master.zip"
                   class="minibutton sidebar-button"
                   aria-label="Download the contents of barisaydinoglu/Detectizr as a zip file"
                   title="Download the contents of barisaydinoglu/Detectizr as a zip file"
                   rel="nofollow">
                  <span class="octicon octicon-cloud-download"></span>
                  Download ZIP
                </a>
              </div>
        </div><!-- /.repository-sidebar -->

        <div id="js-repo-pjax-container" class="repository-content context-loader-container" data-pjax-container>
          

<a href="/barisaydinoglu/Detectizr/blob/d18dd6121a7c80c448b098638929e6e3bf6f460b/dist/detectizr.js" class="hidden js-permalink-shortcut" data-hotkey="y">Permalink</a>

<!-- blob contrib key: blob_contributors:v21:f67b5573f35700f7a16fc6712467d3c7 -->

<div class="file-navigation">
  
<div class="select-menu js-menu-container js-select-menu left">
  <span class="minibutton select-menu-button js-menu-target css-truncate" data-hotkey="w"
    data-master-branch="master"
    data-ref="master"
    title="master"
    role="button" aria-label="Switch branches or tags" tabindex="0" aria-haspopup="true">
    <span class="octicon octicon-git-branch"></span>
    <i>branch:</i>
    <span class="js-select-button css-truncate-target">master</span>
  </span>

  <div class="select-menu-modal-holder js-menu-content js-navigation-container" data-pjax aria-hidden="true">

    <div class="select-menu-modal">
      <div class="select-menu-header">
        <span class="select-menu-title">Switch branches/tags</span>
        <span class="octicon octicon-x js-menu-close" role="button" aria-label="Close"></span>
      </div> <!-- /.select-menu-header -->

      <div class="select-menu-filters">
        <div class="select-menu-text-filter">
          <input type="text" aria-label="Filter branches/tags" id="context-commitish-filter-field" class="js-filterable-field js-navigation-enable" placeholder="Filter branches/tags">
        </div>
        <div class="select-menu-tabs">
          <ul>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="branches" class="js-select-menu-tab">Branches</a>
            </li>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="tags" class="js-select-menu-tab">Tags</a>
            </li>
          </ul>
        </div><!-- /.select-menu-tabs -->
      </div><!-- /.select-menu-filters -->

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="branches">

        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/barisaydinoglu/Detectizr/blob/gh-pages/dist/detectizr.js"
                 data-name="gh-pages"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="gh-pages">gh-pages</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item selected">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/barisaydinoglu/Detectizr/blob/master/dist/detectizr.js"
                 data-name="master"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="master">master</a>
            </div> <!-- /.select-menu-item -->
        </div>

          <div class="select-menu-no-results">Nothing to show</div>
      </div> <!-- /.select-menu-list -->

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="tags">
        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/barisaydinoglu/Detectizr/tree/v2.0.0/dist/detectizr.js"
                 data-name="v2.0.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="v2.0.0">v2.0.0</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/barisaydinoglu/Detectizr/tree/v1.5.0/dist/detectizr.js"
                 data-name="v1.5.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="v1.5.0">v1.5.0</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/barisaydinoglu/Detectizr/tree/v1.4.5/dist/detectizr.js"
                 data-name="v1.4.5"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="v1.4.5">v1.4.5</a>
            </div> <!-- /.select-menu-item -->
        </div>

        <div class="select-menu-no-results">Nothing to show</div>
      </div> <!-- /.select-menu-list -->

    </div> <!-- /.select-menu-modal -->
  </div> <!-- /.select-menu-modal-holder -->
</div> <!-- /.select-menu -->

  <div class="button-group right">
    <a href="/barisaydinoglu/Detectizr/find/master"
          class="js-show-file-finder minibutton empty-icon tooltipped tooltipped-s"
          data-pjax
          data-hotkey="t"
          aria-label="Quickly jump between files">
      <span class="octicon octicon-list-unordered"></span>
    </a>
    <button class="js-zeroclipboard minibutton zeroclipboard-button"
          data-clipboard-text="dist/detectizr.js"
          aria-label="Copy to clipboard"
          data-copied-hint="Copied!">
      <span class="octicon octicon-clippy"></span>
    </button>
  </div>

  <div class="breadcrumb">
    <span class='repo-root js-repo-root'><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/barisaydinoglu/Detectizr" class="" data-branch="master" data-direction="back" data-pjax="true" itemscope="url"><span itemprop="title">Detectizr</span></a></span></span><span class="separator"> / </span><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/barisaydinoglu/Detectizr/tree/master/dist" class="" data-branch="master" data-direction="back" data-pjax="true" itemscope="url"><span itemprop="title">dist</span></a></span><span class="separator"> / </span><strong class="final-path">detectizr.js</strong>
  </div>
</div>


  <div class="commit file-history-tease">
    <div class="file-history-tease-header">
        <img alt="Baris Aydinoglu" class="avatar" data-user="900545" height="24" src="https://avatars2.githubusercontent.com/u/900545?v=2&amp;s=48" width="24" />
        <span class="author"><a href="/barisaydinoglu" rel="author">barisaydinoglu</a></span>
        <time datetime="2014-03-21T19:21:34+02:00" is="relative-time">March 21, 2014</time>
        <div class="commit-title">
            <a href="/barisaydinoglu/Detectizr/commit/d18dd6121a7c80c448b098638929e6e3bf6f460b" class="message" data-pjax="true" title="Update version to 2.0.0">Update version to 2.0.0</a>
        </div>
    </div>

    <div class="participation">
      <p class="quickstat">
        <a href="#blob_contributors_box" rel="facebox">
          <strong>1</strong>
           contributor
        </a>
      </p>
      
    </div>
    <div id="blob_contributors_box" style="display:none">
      <h2 class="facebox-header">Users who have contributed to this file</h2>
      <ul class="facebox-user-list">
          <li class="facebox-user-list-item">
            <img alt="Baris Aydinoglu" data-user="900545" height="24" src="https://avatars2.githubusercontent.com/u/900545?v=2&amp;s=48" width="24" />
            <a href="/barisaydinoglu">barisaydinoglu</a>
          </li>
      </ul>
    </div>
  </div>

<div class="file-box">
  <div class="file">
    <div class="meta clearfix">
      <div class="info file-name">
          <span>503 lines (482 sloc)</span>
          <span class="meta-divider"></span>
        <span>16.805 kb</span>
      </div>
      <div class="actions">
        <div class="button-group">
          <a href="/barisaydinoglu/Detectizr/raw/master/dist/detectizr.js" class="minibutton " id="raw-url">Raw</a>
            <a href="/barisaydinoglu/Detectizr/blame/master/dist/detectizr.js" class="minibutton js-update-url-with-hash">Blame</a>
          <a href="/barisaydinoglu/Detectizr/commits/master/dist/detectizr.js" class="minibutton " rel="nofollow">History</a>
        </div><!-- /.button-group -->

          <a class="octicon-button tooltipped tooltipped-nw"
             href="github-windows://openRepo/https://github.com/barisaydinoglu/Detectizr?branch=master&amp;filepath=dist%2Fdetectizr.js" aria-label="Open this file in GitHub for Windows">
              <span class="octicon octicon-device-desktop"></span>
          </a>

              <a class="octicon-button tooltipped tooltipped-n js-update-url-with-hash"
                 aria-label="Clicking this button will fork this project so you can edit the file"
                 href="/barisaydinoglu/Detectizr/edit/master/dist/detectizr.js"
                 data-method="post" rel="nofollow"><span class="octicon octicon-pencil"></span></a>

            <a class="octicon-button danger tooltipped tooltipped-s"
               href="/barisaydinoglu/Detectizr/delete/master/dist/detectizr.js"
               aria-label="Fork this project and delete file"
               data-method="post" data-test-id="delete-blob-file" rel="nofollow">
          <span class="octicon octicon-trashcan"></span>
        </a>
      </div><!-- /.actions -->
    </div>
      
  <div class="blob-wrapper data type-javascript">
      <table class="highlight tab-size-8 js-file-line-container">
      <tr>
        <td id="L1" class="blob-num js-line-number" data-line-number="1"></td>
        <td id="LC1" class="blob-code js-file-line"><span class="cm">/*!</span></td>
      </tr>
      <tr>
        <td id="L2" class="blob-num js-line-number" data-line-number="2"></td>
        <td id="LC2" class="blob-code js-file-line"><span class="cm"> * Detectizr v2.0.0</span></td>
      </tr>
      <tr>
        <td id="L3" class="blob-num js-line-number" data-line-number="3"></td>
        <td id="LC3" class="blob-code js-file-line"><span class="cm"> * http://barisaydinoglu.github.com/Detectizr/</span></td>
      </tr>
      <tr>
        <td id="L4" class="blob-num js-line-number" data-line-number="4"></td>
        <td id="LC4" class="blob-code js-file-line"><span class="cm"> *</span></td>
      </tr>
      <tr>
        <td id="L5" class="blob-num js-line-number" data-line-number="5"></td>
        <td id="LC5" class="blob-code js-file-line"><span class="cm"> * Written by Baris Aydinoglu (http://baris.aydinoglu.info) - Copyright 2012</span></td>
      </tr>
      <tr>
        <td id="L6" class="blob-num js-line-number" data-line-number="6"></td>
        <td id="LC6" class="blob-code js-file-line"><span class="cm"> * Released under the MIT license</span></td>
      </tr>
      <tr>
        <td id="L7" class="blob-num js-line-number" data-line-number="7"></td>
        <td id="LC7" class="blob-code js-file-line"><span class="cm"> *</span></td>
      </tr>
      <tr>
        <td id="L8" class="blob-num js-line-number" data-line-number="8"></td>
        <td id="LC8" class="blob-code js-file-line"><span class="cm"> * Date: 2014-03-21</span></td>
      </tr>
      <tr>
        <td id="L9" class="blob-num js-line-number" data-line-number="9"></td>
        <td id="LC9" class="blob-code js-file-line"><span class="cm"> */</span></td>
      </tr>
      <tr>
        <td id="L10" class="blob-num js-line-number" data-line-number="10"></td>
        <td id="LC10" class="blob-code js-file-line"><span class="nb">window</span><span class="p">.</span><span class="nx">Detectizr</span> <span class="o">=</span> <span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nb">window</span><span class="p">,</span> <span class="nx">navigator</span><span class="p">,</span> <span class="nb">document</span><span class="p">,</span> <span class="kc">undefined</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L11" class="blob-num js-line-number" data-line-number="11"></td>
        <td id="LC11" class="blob-code js-file-line">	<span class="kd">var</span> <span class="nx">Detectizr</span> <span class="o">=</span> <span class="p">{},</span></td>
      </tr>
      <tr>
        <td id="L12" class="blob-num js-line-number" data-line-number="12"></td>
        <td id="LC12" class="blob-code js-file-line">		<span class="nx">Modernizr</span> <span class="o">=</span> <span class="nb">window</span><span class="p">.</span><span class="nx">Modernizr</span><span class="p">,</span></td>
      </tr>
      <tr>
        <td id="L13" class="blob-num js-line-number" data-line-number="13"></td>
        <td id="LC13" class="blob-code js-file-line">		<span class="nx">deviceTypes</span> <span class="o">=</span> <span class="p">[</span> <span class="s2">&quot;tv&quot;</span><span class="p">,</span> <span class="s2">&quot;tablet&quot;</span><span class="p">,</span> <span class="s2">&quot;mobile&quot;</span><span class="p">,</span> <span class="s2">&quot;desktop&quot;</span> <span class="p">],</span></td>
      </tr>
      <tr>
        <td id="L14" class="blob-num js-line-number" data-line-number="14"></td>
        <td id="LC14" class="blob-code js-file-line">		<span class="nx">options</span> <span class="o">=</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L15" class="blob-num js-line-number" data-line-number="15"></td>
        <td id="LC15" class="blob-code js-file-line">			<span class="c1">// option for enabling HTML classes of all features (not only the true features) to be added</span></td>
      </tr>
      <tr>
        <td id="L16" class="blob-num js-line-number" data-line-number="16"></td>
        <td id="LC16" class="blob-code js-file-line">			<span class="nx">addAllFeaturesAsClass</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></td>
      </tr>
      <tr>
        <td id="L17" class="blob-num js-line-number" data-line-number="17"></td>
        <td id="LC17" class="blob-code js-file-line">			<span class="c1">// option for enabling detection of device</span></td>
      </tr>
      <tr>
        <td id="L18" class="blob-num js-line-number" data-line-number="18"></td>
        <td id="LC18" class="blob-code js-file-line">			<span class="nx">detectDevice</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span></td>
      </tr>
      <tr>
        <td id="L19" class="blob-num js-line-number" data-line-number="19"></td>
        <td id="LC19" class="blob-code js-file-line">			<span class="c1">// option for enabling detection of device model</span></td>
      </tr>
      <tr>
        <td id="L20" class="blob-num js-line-number" data-line-number="20"></td>
        <td id="LC20" class="blob-code js-file-line">			<span class="nx">detectDeviceModel</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span></td>
      </tr>
      <tr>
        <td id="L21" class="blob-num js-line-number" data-line-number="21"></td>
        <td id="LC21" class="blob-code js-file-line">			<span class="c1">// option for enabling detection of screen size</span></td>
      </tr>
      <tr>
        <td id="L22" class="blob-num js-line-number" data-line-number="22"></td>
        <td id="LC22" class="blob-code js-file-line">			<span class="nx">detectScreen</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span></td>
      </tr>
      <tr>
        <td id="L23" class="blob-num js-line-number" data-line-number="23"></td>
        <td id="LC23" class="blob-code js-file-line">			<span class="c1">// option for enabling detection of operating system type and version</span></td>
      </tr>
      <tr>
        <td id="L24" class="blob-num js-line-number" data-line-number="24"></td>
        <td id="LC24" class="blob-code js-file-line">			<span class="nx">detectOS</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span></td>
      </tr>
      <tr>
        <td id="L25" class="blob-num js-line-number" data-line-number="25"></td>
        <td id="LC25" class="blob-code js-file-line">			<span class="c1">// option for enabling detection of browser type and version</span></td>
      </tr>
      <tr>
        <td id="L26" class="blob-num js-line-number" data-line-number="26"></td>
        <td id="LC26" class="blob-code js-file-line">			<span class="nx">detectBrowser</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span></td>
      </tr>
      <tr>
        <td id="L27" class="blob-num js-line-number" data-line-number="27"></td>
        <td id="LC27" class="blob-code js-file-line">			<span class="c1">// option for enabling detection of common browser plugins</span></td>
      </tr>
      <tr>
        <td id="L28" class="blob-num js-line-number" data-line-number="28"></td>
        <td id="LC28" class="blob-code js-file-line">			<span class="nx">detectPlugins</span><span class="o">:</span> <span class="kc">true</span></td>
      </tr>
      <tr>
        <td id="L29" class="blob-num js-line-number" data-line-number="29"></td>
        <td id="LC29" class="blob-code js-file-line">		<span class="p">},</span></td>
      </tr>
      <tr>
        <td id="L30" class="blob-num js-line-number" data-line-number="30"></td>
        <td id="LC30" class="blob-code js-file-line">		<span class="nx">plugins2detect</span> <span class="o">=</span> <span class="p">[</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L31" class="blob-num js-line-number" data-line-number="31"></td>
        <td id="LC31" class="blob-code js-file-line">			<span class="nx">name</span><span class="o">:</span> <span class="s2">&quot;adobereader&quot;</span><span class="p">,</span></td>
      </tr>
      <tr>
        <td id="L32" class="blob-num js-line-number" data-line-number="32"></td>
        <td id="LC32" class="blob-code js-file-line">			<span class="nx">substrs</span><span class="o">:</span> <span class="p">[</span> <span class="s2">&quot;Adobe&quot;</span><span class="p">,</span> <span class="s2">&quot;Acrobat&quot;</span> <span class="p">],</span></td>
      </tr>
      <tr>
        <td id="L33" class="blob-num js-line-number" data-line-number="33"></td>
        <td id="LC33" class="blob-code js-file-line">			<span class="c1">// AcroPDF.PDF is used by version 7 and later</span></td>
      </tr>
      <tr>
        <td id="L34" class="blob-num js-line-number" data-line-number="34"></td>
        <td id="LC34" class="blob-code js-file-line">			<span class="c1">// PDF.PdfCtrl is used by version 6 and earlier</span></td>
      </tr>
      <tr>
        <td id="L35" class="blob-num js-line-number" data-line-number="35"></td>
        <td id="LC35" class="blob-code js-file-line">			<span class="nx">progIds</span><span class="o">:</span> <span class="p">[</span> <span class="s2">&quot;AcroPDF.PDF&quot;</span><span class="p">,</span> <span class="s2">&quot;PDF.PDFCtrl.5&quot;</span> <span class="p">]</span></td>
      </tr>
      <tr>
        <td id="L36" class="blob-num js-line-number" data-line-number="36"></td>
        <td id="LC36" class="blob-code js-file-line">		<span class="p">},</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L37" class="blob-num js-line-number" data-line-number="37"></td>
        <td id="LC37" class="blob-code js-file-line">			<span class="nx">name</span><span class="o">:</span> <span class="s2">&quot;flash&quot;</span><span class="p">,</span></td>
      </tr>
      <tr>
        <td id="L38" class="blob-num js-line-number" data-line-number="38"></td>
        <td id="LC38" class="blob-code js-file-line">			<span class="nx">substrs</span><span class="o">:</span> <span class="p">[</span> <span class="s2">&quot;Shockwave Flash&quot;</span> <span class="p">],</span></td>
      </tr>
      <tr>
        <td id="L39" class="blob-num js-line-number" data-line-number="39"></td>
        <td id="LC39" class="blob-code js-file-line">			<span class="nx">progIds</span><span class="o">:</span> <span class="p">[</span> <span class="s2">&quot;ShockwaveFlash.ShockwaveFlash.1&quot;</span> <span class="p">]</span></td>
      </tr>
      <tr>
        <td id="L40" class="blob-num js-line-number" data-line-number="40"></td>
        <td id="LC40" class="blob-code js-file-line">		<span class="p">},</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L41" class="blob-num js-line-number" data-line-number="41"></td>
        <td id="LC41" class="blob-code js-file-line">			<span class="nx">name</span><span class="o">:</span> <span class="s2">&quot;wmplayer&quot;</span><span class="p">,</span></td>
      </tr>
      <tr>
        <td id="L42" class="blob-num js-line-number" data-line-number="42"></td>
        <td id="LC42" class="blob-code js-file-line">			<span class="nx">substrs</span><span class="o">:</span> <span class="p">[</span> <span class="s2">&quot;Windows Media&quot;</span> <span class="p">],</span></td>
      </tr>
      <tr>
        <td id="L43" class="blob-num js-line-number" data-line-number="43"></td>
        <td id="LC43" class="blob-code js-file-line">			<span class="nx">progIds</span><span class="o">:</span> <span class="p">[</span> <span class="s2">&quot;wmplayer.ocx&quot;</span> <span class="p">]</span></td>
      </tr>
      <tr>
        <td id="L44" class="blob-num js-line-number" data-line-number="44"></td>
        <td id="LC44" class="blob-code js-file-line">		<span class="p">},</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L45" class="blob-num js-line-number" data-line-number="45"></td>
        <td id="LC45" class="blob-code js-file-line">			<span class="nx">name</span><span class="o">:</span> <span class="s2">&quot;silverlight&quot;</span><span class="p">,</span></td>
      </tr>
      <tr>
        <td id="L46" class="blob-num js-line-number" data-line-number="46"></td>
        <td id="LC46" class="blob-code js-file-line">			<span class="nx">substrs</span><span class="o">:</span> <span class="p">[</span> <span class="s2">&quot;Silverlight&quot;</span> <span class="p">],</span></td>
      </tr>
      <tr>
        <td id="L47" class="blob-num js-line-number" data-line-number="47"></td>
        <td id="LC47" class="blob-code js-file-line">			<span class="nx">progIds</span><span class="o">:</span> <span class="p">[</span> <span class="s2">&quot;AgControl.AgControl&quot;</span> <span class="p">]</span></td>
      </tr>
      <tr>
        <td id="L48" class="blob-num js-line-number" data-line-number="48"></td>
        <td id="LC48" class="blob-code js-file-line">		<span class="p">},</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L49" class="blob-num js-line-number" data-line-number="49"></td>
        <td id="LC49" class="blob-code js-file-line">			<span class="nx">name</span><span class="o">:</span> <span class="s2">&quot;quicktime&quot;</span><span class="p">,</span></td>
      </tr>
      <tr>
        <td id="L50" class="blob-num js-line-number" data-line-number="50"></td>
        <td id="LC50" class="blob-code js-file-line">			<span class="nx">substrs</span><span class="o">:</span> <span class="p">[</span> <span class="s2">&quot;QuickTime&quot;</span> <span class="p">],</span></td>
      </tr>
      <tr>
        <td id="L51" class="blob-num js-line-number" data-line-number="51"></td>
        <td id="LC51" class="blob-code js-file-line">			<span class="nx">progIds</span><span class="o">:</span> <span class="p">[</span> <span class="s2">&quot;QuickTime.QuickTime&quot;</span> <span class="p">]</span></td>
      </tr>
      <tr>
        <td id="L52" class="blob-num js-line-number" data-line-number="52"></td>
        <td id="LC52" class="blob-code js-file-line">		<span class="p">}</span> <span class="p">],</span></td>
      </tr>
      <tr>
        <td id="L53" class="blob-num js-line-number" data-line-number="53"></td>
        <td id="LC53" class="blob-code js-file-line">		<span class="nx">rclass</span> <span class="o">=</span> <span class="sr">/[\t\r\n]/g</span><span class="p">,</span></td>
      </tr>
      <tr>
        <td id="L54" class="blob-num js-line-number" data-line-number="54"></td>
        <td id="LC54" class="blob-code js-file-line">		<span class="nx">docElement</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">documentElement</span><span class="p">,</span></td>
      </tr>
      <tr>
        <td id="L55" class="blob-num js-line-number" data-line-number="55"></td>
        <td id="LC55" class="blob-code js-file-line">		<span class="nx">resizeTimeoutId</span><span class="p">,</span></td>
      </tr>
      <tr>
        <td id="L56" class="blob-num js-line-number" data-line-number="56"></td>
        <td id="LC56" class="blob-code js-file-line">		<span class="nx">oldOrientation</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L57" class="blob-num js-line-number" data-line-number="57"></td>
        <td id="LC57" class="blob-code js-file-line">
</td>
      </tr>
      <tr>
        <td id="L58" class="blob-num js-line-number" data-line-number="58"></td>
        <td id="LC58" class="blob-code js-file-line">	<span class="kd">function</span> <span class="nx">extend</span><span class="p">(</span><span class="nx">obj</span><span class="p">,</span> <span class="nx">extObj</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L59" class="blob-num js-line-number" data-line-number="59"></td>
        <td id="LC59" class="blob-code js-file-line">		<span class="kd">var</span> <span class="nx">a</span><span class="p">,</span> <span class="nx">b</span><span class="p">,</span> <span class="nx">i</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L60" class="blob-num js-line-number" data-line-number="60"></td>
        <td id="LC60" class="blob-code js-file-line">		<span class="k">if</span> <span class="p">(</span><span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span> <span class="o">&gt;</span> <span class="mi">2</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L61" class="blob-num js-line-number" data-line-number="61"></td>
        <td id="LC61" class="blob-code js-file-line">			<span class="k">for</span> <span class="p">(</span><span class="nx">a</span> <span class="o">=</span> <span class="mi">1</span><span class="p">,</span> <span class="nx">b</span> <span class="o">=</span> <span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">a</span> <span class="o">&lt;</span> <span class="nx">b</span><span class="p">;</span> <span class="nx">a</span> <span class="o">+=</span> <span class="mi">1</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L62" class="blob-num js-line-number" data-line-number="62"></td>
        <td id="LC62" class="blob-code js-file-line">				<span class="nx">extend</span><span class="p">(</span><span class="nx">obj</span><span class="p">,</span> <span class="nx">arguments</span><span class="p">[</span><span class="nx">a</span><span class="p">]);</span></td>
      </tr>
      <tr>
        <td id="L63" class="blob-num js-line-number" data-line-number="63"></td>
        <td id="LC63" class="blob-code js-file-line">			<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L64" class="blob-num js-line-number" data-line-number="64"></td>
        <td id="LC64" class="blob-code js-file-line">		<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L65" class="blob-num js-line-number" data-line-number="65"></td>
        <td id="LC65" class="blob-code js-file-line">			<span class="k">for</span> <span class="p">(</span><span class="nx">i</span> <span class="k">in</span> <span class="nx">extObj</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L66" class="blob-num js-line-number" data-line-number="66"></td>
        <td id="LC66" class="blob-code js-file-line">				<span class="k">if</span> <span class="p">(</span><span class="nx">extObj</span><span class="p">.</span><span class="nx">hasOwnProperty</span><span class="p">(</span><span class="nx">i</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L67" class="blob-num js-line-number" data-line-number="67"></td>
        <td id="LC67" class="blob-code js-file-line">					<span class="nx">obj</span><span class="p">[</span><span class="nx">i</span><span class="p">]</span> <span class="o">=</span> <span class="nx">extObj</span><span class="p">[</span><span class="nx">i</span><span class="p">];</span></td>
      </tr>
      <tr>
        <td id="L68" class="blob-num js-line-number" data-line-number="68"></td>
        <td id="LC68" class="blob-code js-file-line">				<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L69" class="blob-num js-line-number" data-line-number="69"></td>
        <td id="LC69" class="blob-code js-file-line">			<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L70" class="blob-num js-line-number" data-line-number="70"></td>
        <td id="LC70" class="blob-code js-file-line">		<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L71" class="blob-num js-line-number" data-line-number="71"></td>
        <td id="LC71" class="blob-code js-file-line">		<span class="k">return</span> <span class="nx">obj</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L72" class="blob-num js-line-number" data-line-number="72"></td>
        <td id="LC72" class="blob-code js-file-line">	<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L73" class="blob-num js-line-number" data-line-number="73"></td>
        <td id="LC73" class="blob-code js-file-line">
</td>
      </tr>
      <tr>
        <td id="L74" class="blob-num js-line-number" data-line-number="74"></td>
        <td id="LC74" class="blob-code js-file-line">	<span class="c1">// simplified and localized indexOf method as one parameter fixed as useragent</span></td>
      </tr>
      <tr>
        <td id="L75" class="blob-num js-line-number" data-line-number="75"></td>
        <td id="LC75" class="blob-code js-file-line">	<span class="kd">function</span> <span class="nx">is</span><span class="p">(</span><span class="nx">key</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L76" class="blob-num js-line-number" data-line-number="76"></td>
        <td id="LC76" class="blob-code js-file-line">		<span class="k">return</span> <span class="nx">Detectizr</span><span class="p">.</span><span class="nx">browser</span><span class="p">.</span><span class="nx">userAgent</span><span class="p">.</span><span class="nx">indexOf</span><span class="p">(</span><span class="nx">key</span><span class="p">)</span> <span class="o">&gt;</span> <span class="o">-</span><span class="mi">1</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L77" class="blob-num js-line-number" data-line-number="77"></td>
        <td id="LC77" class="blob-code js-file-line">	<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L78" class="blob-num js-line-number" data-line-number="78"></td>
        <td id="LC78" class="blob-code js-file-line">
</td>
      </tr>
      <tr>
        <td id="L79" class="blob-num js-line-number" data-line-number="79"></td>
        <td id="LC79" class="blob-code js-file-line">	<span class="c1">// simplified and localized regex test method as one parameter fixed as useragent</span></td>
      </tr>
      <tr>
        <td id="L80" class="blob-num js-line-number" data-line-number="80"></td>
        <td id="LC80" class="blob-code js-file-line">	<span class="kd">function</span> <span class="nx">test</span><span class="p">(</span><span class="nx">regex</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L81" class="blob-num js-line-number" data-line-number="81"></td>
        <td id="LC81" class="blob-code js-file-line">		<span class="k">return</span> <span class="nx">regex</span><span class="p">.</span><span class="nx">test</span><span class="p">(</span><span class="nx">Detectizr</span><span class="p">.</span><span class="nx">browser</span><span class="p">.</span><span class="nx">userAgent</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L82" class="blob-num js-line-number" data-line-number="82"></td>
        <td id="LC82" class="blob-code js-file-line">	<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L83" class="blob-num js-line-number" data-line-number="83"></td>
        <td id="LC83" class="blob-code js-file-line">
</td>
      </tr>
      <tr>
        <td id="L84" class="blob-num js-line-number" data-line-number="84"></td>
        <td id="LC84" class="blob-code js-file-line">	<span class="c1">// simplified and localized regex exec method as one parameter fixed as useragent</span></td>
      </tr>
      <tr>
        <td id="L85" class="blob-num js-line-number" data-line-number="85"></td>
        <td id="LC85" class="blob-code js-file-line">	<span class="kd">function</span> <span class="nx">exec</span><span class="p">(</span><span class="nx">regex</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L86" class="blob-num js-line-number" data-line-number="86"></td>
        <td id="LC86" class="blob-code js-file-line">		<span class="k">return</span> <span class="nx">regex</span><span class="p">.</span><span class="nx">exec</span><span class="p">(</span><span class="nx">Detectizr</span><span class="p">.</span><span class="nx">browser</span><span class="p">.</span><span class="nx">userAgent</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L87" class="blob-num js-line-number" data-line-number="87"></td>
        <td id="LC87" class="blob-code js-file-line">	<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L88" class="blob-num js-line-number" data-line-number="88"></td>
        <td id="LC88" class="blob-code js-file-line">
</td>
      </tr>
      <tr>
        <td id="L89" class="blob-num js-line-number" data-line-number="89"></td>
        <td id="LC89" class="blob-code js-file-line">	<span class="c1">// localized string trim method</span></td>
      </tr>
      <tr>
        <td id="L90" class="blob-num js-line-number" data-line-number="90"></td>
        <td id="LC90" class="blob-code js-file-line">	<span class="kd">function</span> <span class="nx">trim</span><span class="p">(</span><span class="nx">value</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L91" class="blob-num js-line-number" data-line-number="91"></td>
        <td id="LC91" class="blob-code js-file-line">		<span class="k">return</span> <span class="nx">value</span><span class="p">.</span><span class="nx">replace</span><span class="p">(</span><span class="sr">/^\s+|\s+$/g</span><span class="p">,</span> <span class="s2">&quot;&quot;</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L92" class="blob-num js-line-number" data-line-number="92"></td>
        <td id="LC92" class="blob-code js-file-line">	<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L93" class="blob-num js-line-number" data-line-number="93"></td>
        <td id="LC93" class="blob-code js-file-line">
</td>
      </tr>
      <tr>
        <td id="L94" class="blob-num js-line-number" data-line-number="94"></td>
        <td id="LC94" class="blob-code js-file-line">	<span class="c1">// convert string to camelcase</span></td>
      </tr>
      <tr>
        <td id="L95" class="blob-num js-line-number" data-line-number="95"></td>
        <td id="LC95" class="blob-code js-file-line">	<span class="kd">function</span> <span class="nx">toCamel</span><span class="p">(</span><span class="nx">string</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L96" class="blob-num js-line-number" data-line-number="96"></td>
        <td id="LC96" class="blob-code js-file-line">		<span class="k">if</span> <span class="p">(</span><span class="nx">string</span> <span class="o">===</span> <span class="kc">null</span> <span class="o">||</span> <span class="nx">string</span> <span class="o">===</span> <span class="kc">undefined</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L97" class="blob-num js-line-number" data-line-number="97"></td>
        <td id="LC97" class="blob-code js-file-line">			<span class="k">return</span> <span class="s2">&quot;&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L98" class="blob-num js-line-number" data-line-number="98"></td>
        <td id="LC98" class="blob-code js-file-line">		<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L99" class="blob-num js-line-number" data-line-number="99"></td>
        <td id="LC99" class="blob-code js-file-line">		<span class="k">return</span> <span class="nb">String</span><span class="p">(</span><span class="nx">string</span><span class="p">).</span><span class="nx">replace</span><span class="p">(</span><span class="sr">/((\s|\-|\.)+[a-z0-9])/g</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">$1</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L100" class="blob-num js-line-number" data-line-number="100"></td>
        <td id="LC100" class="blob-code js-file-line">			<span class="k">return</span> <span class="nx">$1</span><span class="p">.</span><span class="nx">toUpperCase</span><span class="p">().</span><span class="nx">replace</span><span class="p">(</span><span class="sr">/(\s|\-|\.)/g</span><span class="p">,</span> <span class="s2">&quot;&quot;</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L101" class="blob-num js-line-number" data-line-number="101"></td>
        <td id="LC101" class="blob-code js-file-line">		<span class="p">});</span></td>
      </tr>
      <tr>
        <td id="L102" class="blob-num js-line-number" data-line-number="102"></td>
        <td id="LC102" class="blob-code js-file-line">	<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L103" class="blob-num js-line-number" data-line-number="103"></td>
        <td id="LC103" class="blob-code js-file-line">
</td>
      </tr>
      <tr>
        <td id="L104" class="blob-num js-line-number" data-line-number="104"></td>
        <td id="LC104" class="blob-code js-file-line">	<span class="c1">// removeClass function inspired from jQuery.removeClass</span></td>
      </tr>
      <tr>
        <td id="L105" class="blob-num js-line-number" data-line-number="105"></td>
        <td id="LC105" class="blob-code js-file-line">	<span class="kd">function</span> <span class="nx">removeClass</span><span class="p">(</span><span class="nx">element</span><span class="p">,</span> <span class="nx">value</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L106" class="blob-num js-line-number" data-line-number="106"></td>
        <td id="LC106" class="blob-code js-file-line">		<span class="kd">var</span> <span class="nx">class2remove</span> <span class="o">=</span> <span class="nx">value</span> <span class="o">||</span> <span class="s2">&quot;&quot;</span><span class="p">,</span></td>
      </tr>
      <tr>
        <td id="L107" class="blob-num js-line-number" data-line-number="107"></td>
        <td id="LC107" class="blob-code js-file-line">			<span class="nx">cur</span> <span class="o">=</span> <span class="nx">element</span><span class="p">.</span><span class="nx">nodeType</span> <span class="o">===</span> <span class="mi">1</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="nx">element</span><span class="p">.</span><span class="nx">className</span> <span class="o">?</span> <span class="p">(</span><span class="s2">&quot; &quot;</span> <span class="o">+</span> <span class="nx">element</span><span class="p">.</span><span class="nx">className</span> <span class="o">+</span> <span class="s2">&quot; &quot;</span><span class="p">).</span><span class="nx">replace</span><span class="p">(</span><span class="nx">rclass</span><span class="p">,</span> <span class="s2">&quot; &quot;</span><span class="p">)</span> <span class="o">:</span> <span class="s2">&quot;&quot;</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L108" class="blob-num js-line-number" data-line-number="108"></td>
        <td id="LC108" class="blob-code js-file-line">		<span class="k">if</span> <span class="p">(</span><span class="nx">cur</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L109" class="blob-num js-line-number" data-line-number="109"></td>
        <td id="LC109" class="blob-code js-file-line">			<span class="k">while</span> <span class="p">(</span><span class="nx">cur</span><span class="p">.</span><span class="nx">indexOf</span><span class="p">(</span><span class="s2">&quot; &quot;</span> <span class="o">+</span> <span class="nx">class2remove</span> <span class="o">+</span> <span class="s2">&quot; &quot;</span><span class="p">)</span> <span class="o">&gt;=</span> <span class="mi">0</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L110" class="blob-num js-line-number" data-line-number="110"></td>
        <td id="LC110" class="blob-code js-file-line">				<span class="nx">cur</span> <span class="o">=</span> <span class="nx">cur</span><span class="p">.</span><span class="nx">replace</span><span class="p">(</span><span class="s2">&quot; &quot;</span> <span class="o">+</span> <span class="nx">class2remove</span> <span class="o">+</span> <span class="s2">&quot; &quot;</span><span class="p">,</span> <span class="s2">&quot; &quot;</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L111" class="blob-num js-line-number" data-line-number="111"></td>
        <td id="LC111" class="blob-code js-file-line">			<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L112" class="blob-num js-line-number" data-line-number="112"></td>
        <td id="LC112" class="blob-code js-file-line">			<span class="nx">element</span><span class="p">.</span><span class="nx">className</span> <span class="o">=</span> <span class="nx">value</span> <span class="o">?</span> <span class="nx">trim</span><span class="p">(</span><span class="nx">cur</span><span class="p">)</span> <span class="o">:</span> <span class="s2">&quot;&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L113" class="blob-num js-line-number" data-line-number="113"></td>
        <td id="LC113" class="blob-code js-file-line">		<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L114" class="blob-num js-line-number" data-line-number="114"></td>
        <td id="LC114" class="blob-code js-file-line">	<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L115" class="blob-num js-line-number" data-line-number="115"></td>
        <td id="LC115" class="blob-code js-file-line">
</td>
      </tr>
      <tr>
        <td id="L116" class="blob-num js-line-number" data-line-number="116"></td>
        <td id="LC116" class="blob-code js-file-line">	<span class="c1">// add version test to Modernizr</span></td>
      </tr>
      <tr>
        <td id="L117" class="blob-num js-line-number" data-line-number="117"></td>
        <td id="LC117" class="blob-code js-file-line">	<span class="kd">function</span> <span class="nx">addVersionTest</span><span class="p">(</span><span class="nx">version</span><span class="p">,</span> <span class="nx">major</span><span class="p">,</span> <span class="nx">minor</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L118" class="blob-num js-line-number" data-line-number="118"></td>
        <td id="LC118" class="blob-code js-file-line">		<span class="k">if</span> <span class="p">(</span> <span class="o">!!</span><span class="nx">version</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L119" class="blob-num js-line-number" data-line-number="119"></td>
        <td id="LC119" class="blob-code js-file-line">			<span class="nx">version</span> <span class="o">=</span> <span class="nx">toCamel</span><span class="p">(</span><span class="nx">version</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L120" class="blob-num js-line-number" data-line-number="120"></td>
        <td id="LC120" class="blob-code js-file-line">			<span class="k">if</span> <span class="p">(</span> <span class="o">!!</span><span class="nx">major</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L121" class="blob-num js-line-number" data-line-number="121"></td>
        <td id="LC121" class="blob-code js-file-line">				<span class="nx">major</span> <span class="o">=</span> <span class="nx">toCamel</span><span class="p">(</span><span class="nx">major</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L122" class="blob-num js-line-number" data-line-number="122"></td>
        <td id="LC122" class="blob-code js-file-line">				<span class="nx">addConditionalTest</span><span class="p">(</span><span class="nx">version</span> <span class="o">+</span> <span class="nx">major</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L123" class="blob-num js-line-number" data-line-number="123"></td>
        <td id="LC123" class="blob-code js-file-line">				<span class="k">if</span> <span class="p">(</span> <span class="o">!!</span><span class="nx">minor</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L124" class="blob-num js-line-number" data-line-number="124"></td>
        <td id="LC124" class="blob-code js-file-line">					<span class="nx">addConditionalTest</span><span class="p">(</span><span class="nx">version</span> <span class="o">+</span> <span class="nx">major</span> <span class="o">+</span> <span class="s2">&quot;_&quot;</span> <span class="o">+</span> <span class="nx">minor</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L125" class="blob-num js-line-number" data-line-number="125"></td>
        <td id="LC125" class="blob-code js-file-line">				<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L126" class="blob-num js-line-number" data-line-number="126"></td>
        <td id="LC126" class="blob-code js-file-line">			<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L127" class="blob-num js-line-number" data-line-number="127"></td>
        <td id="LC127" class="blob-code js-file-line">		<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L128" class="blob-num js-line-number" data-line-number="128"></td>
        <td id="LC128" class="blob-code js-file-line">	<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L129" class="blob-num js-line-number" data-line-number="129"></td>
        <td id="LC129" class="blob-code js-file-line">
</td>
      </tr>
      <tr>
        <td id="L130" class="blob-num js-line-number" data-line-number="130"></td>
        <td id="LC130" class="blob-code js-file-line">	<span class="kd">function</span> <span class="nx">checkOrientation</span><span class="p">()</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L131" class="blob-num js-line-number" data-line-number="131"></td>
        <td id="LC131" class="blob-code js-file-line">		<span class="c1">//timeout wrapper points with doResizeCode as callback</span></td>
      </tr>
      <tr>
        <td id="L132" class="blob-num js-line-number" data-line-number="132"></td>
        <td id="LC132" class="blob-code js-file-line">		<span class="nb">window</span><span class="p">.</span><span class="nx">clearTimeout</span><span class="p">(</span><span class="nx">resizeTimeoutId</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L133" class="blob-num js-line-number" data-line-number="133"></td>
        <td id="LC133" class="blob-code js-file-line">		<span class="nx">resizeTimeoutId</span> <span class="o">=</span> <span class="nb">window</span><span class="p">.</span><span class="nx">setTimeout</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L134" class="blob-num js-line-number" data-line-number="134"></td>
        <td id="LC134" class="blob-code js-file-line">			<span class="nx">oldOrientation</span> <span class="o">=</span> <span class="nx">Detectizr</span><span class="p">.</span><span class="nx">device</span><span class="p">.</span><span class="nx">orientation</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L135" class="blob-num js-line-number" data-line-number="135"></td>
        <td id="LC135" class="blob-code js-file-line">			<span class="c1">//wrapper for height/width check</span></td>
      </tr>
      <tr>
        <td id="L136" class="blob-num js-line-number" data-line-number="136"></td>
        <td id="LC136" class="blob-code js-file-line">			<span class="k">if</span> <span class="p">(</span><span class="nb">window</span><span class="p">.</span><span class="nx">innerHeight</span> <span class="o">&gt;</span> <span class="nb">window</span><span class="p">.</span><span class="nx">innerWidth</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L137" class="blob-num js-line-number" data-line-number="137"></td>
        <td id="LC137" class="blob-code js-file-line">				<span class="nx">Detectizr</span><span class="p">.</span><span class="nx">device</span><span class="p">.</span><span class="nx">orientation</span> <span class="o">=</span> <span class="s2">&quot;portrait&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L138" class="blob-num js-line-number" data-line-number="138"></td>
        <td id="LC138" class="blob-code js-file-line">			<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L139" class="blob-num js-line-number" data-line-number="139"></td>
        <td id="LC139" class="blob-code js-file-line">				<span class="nx">Detectizr</span><span class="p">.</span><span class="nx">device</span><span class="p">.</span><span class="nx">orientation</span> <span class="o">=</span> <span class="s2">&quot;landscape&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L140" class="blob-num js-line-number" data-line-number="140"></td>
        <td id="LC140" class="blob-code js-file-line">			<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L141" class="blob-num js-line-number" data-line-number="141"></td>
        <td id="LC141" class="blob-code js-file-line">			<span class="nx">addConditionalTest</span><span class="p">(</span><span class="nx">Detectizr</span><span class="p">.</span><span class="nx">device</span><span class="p">.</span><span class="nx">orientation</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L142" class="blob-num js-line-number" data-line-number="142"></td>
        <td id="LC142" class="blob-code js-file-line">			<span class="k">if</span> <span class="p">(</span><span class="nx">oldOrientation</span> <span class="o">!==</span> <span class="nx">Detectizr</span><span class="p">.</span><span class="nx">device</span><span class="p">.</span><span class="nx">orientation</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L143" class="blob-num js-line-number" data-line-number="143"></td>
        <td id="LC143" class="blob-code js-file-line">				<span class="nx">addConditionalTest</span><span class="p">(</span><span class="nx">oldOrientation</span><span class="p">,</span> <span class="kc">false</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L144" class="blob-num js-line-number" data-line-number="144"></td>
        <td id="LC144" class="blob-code js-file-line">			<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L145" class="blob-num js-line-number" data-line-number="145"></td>
        <td id="LC145" class="blob-code js-file-line">		<span class="p">},</span> <span class="mi">10</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L146" class="blob-num js-line-number" data-line-number="146"></td>
        <td id="LC146" class="blob-code js-file-line">	<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L147" class="blob-num js-line-number" data-line-number="147"></td>
        <td id="LC147" class="blob-code js-file-line">
</td>
      </tr>
      <tr>
        <td id="L148" class="blob-num js-line-number" data-line-number="148"></td>
        <td id="LC148" class="blob-code js-file-line">	<span class="c1">// add test to Modernizr based on a condition</span></td>
      </tr>
      <tr>
        <td id="L149" class="blob-num js-line-number" data-line-number="149"></td>
        <td id="LC149" class="blob-code js-file-line">	<span class="kd">function</span> <span class="nx">addConditionalTest</span><span class="p">(</span><span class="nx">feature</span><span class="p">,</span> <span class="nx">test</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L150" class="blob-num js-line-number" data-line-number="150"></td>
        <td id="LC150" class="blob-code js-file-line">		<span class="k">if</span> <span class="p">(</span> <span class="o">!!</span><span class="nx">feature</span> <span class="o">&amp;&amp;</span> <span class="o">!!</span><span class="nx">Modernizr</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L151" class="blob-num js-line-number" data-line-number="151"></td>
        <td id="LC151" class="blob-code js-file-line">			<span class="k">if</span> <span class="p">(</span><span class="nx">options</span><span class="p">.</span><span class="nx">addAllFeaturesAsClass</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L152" class="blob-num js-line-number" data-line-number="152"></td>
        <td id="LC152" class="blob-code js-file-line">				<span class="nx">Modernizr</span><span class="p">.</span><span class="nx">addTest</span><span class="p">(</span><span class="nx">feature</span><span class="p">,</span> <span class="nx">test</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L153" class="blob-num js-line-number" data-line-number="153"></td>
        <td id="LC153" class="blob-code js-file-line">			<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L154" class="blob-num js-line-number" data-line-number="154"></td>
        <td id="LC154" class="blob-code js-file-line">				<span class="nx">test</span> <span class="o">=</span> <span class="k">typeof</span> <span class="nx">test</span> <span class="o">===</span> <span class="s2">&quot;function&quot;</span> <span class="o">?</span> <span class="nx">test</span><span class="p">()</span> <span class="o">:</span> <span class="nx">test</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L155" class="blob-num js-line-number" data-line-number="155"></td>
        <td id="LC155" class="blob-code js-file-line">				<span class="k">if</span> <span class="p">(</span><span class="nx">test</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L156" class="blob-num js-line-number" data-line-number="156"></td>
        <td id="LC156" class="blob-code js-file-line">					<span class="nx">Modernizr</span><span class="p">.</span><span class="nx">addTest</span><span class="p">(</span><span class="nx">feature</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L157" class="blob-num js-line-number" data-line-number="157"></td>
        <td id="LC157" class="blob-code js-file-line">				<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L158" class="blob-num js-line-number" data-line-number="158"></td>
        <td id="LC158" class="blob-code js-file-line">					<span class="k">delete</span> <span class="nx">Modernizr</span><span class="p">[</span><span class="nx">feature</span><span class="p">];</span></td>
      </tr>
      <tr>
        <td id="L159" class="blob-num js-line-number" data-line-number="159"></td>
        <td id="LC159" class="blob-code js-file-line">					<span class="nx">removeClass</span><span class="p">(</span><span class="nx">docElement</span><span class="p">,</span> <span class="nx">feature</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L160" class="blob-num js-line-number" data-line-number="160"></td>
        <td id="LC160" class="blob-code js-file-line">				<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L161" class="blob-num js-line-number" data-line-number="161"></td>
        <td id="LC161" class="blob-code js-file-line">			<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L162" class="blob-num js-line-number" data-line-number="162"></td>
        <td id="LC162" class="blob-code js-file-line">		<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L163" class="blob-num js-line-number" data-line-number="163"></td>
        <td id="LC163" class="blob-code js-file-line">	<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L164" class="blob-num js-line-number" data-line-number="164"></td>
        <td id="LC164" class="blob-code js-file-line">
</td>
      </tr>
      <tr>
        <td id="L165" class="blob-num js-line-number" data-line-number="165"></td>
        <td id="LC165" class="blob-code js-file-line">	<span class="c1">// set version based on versionFull</span></td>
      </tr>
      <tr>
        <td id="L166" class="blob-num js-line-number" data-line-number="166"></td>
        <td id="LC166" class="blob-code js-file-line">	<span class="kd">function</span> <span class="nx">setVersion</span><span class="p">(</span><span class="nx">versionType</span><span class="p">,</span> <span class="nx">versionFull</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L167" class="blob-num js-line-number" data-line-number="167"></td>
        <td id="LC167" class="blob-code js-file-line">		<span class="nx">versionType</span><span class="p">.</span><span class="nx">version</span> <span class="o">=</span> <span class="nx">versionFull</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L168" class="blob-num js-line-number" data-line-number="168"></td>
        <td id="LC168" class="blob-code js-file-line">		<span class="kd">var</span> <span class="nx">versionArray</span> <span class="o">=</span> <span class="nx">versionFull</span><span class="p">.</span><span class="nx">split</span><span class="p">(</span><span class="s2">&quot;.&quot;</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L169" class="blob-num js-line-number" data-line-number="169"></td>
        <td id="LC169" class="blob-code js-file-line">		<span class="k">if</span> <span class="p">(</span><span class="nx">versionArray</span><span class="p">.</span><span class="nx">length</span> <span class="o">&gt;</span> <span class="mi">0</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L170" class="blob-num js-line-number" data-line-number="170"></td>
        <td id="LC170" class="blob-code js-file-line">			<span class="nx">versionArray</span> <span class="o">=</span> <span class="nx">versionArray</span><span class="p">.</span><span class="nx">reverse</span><span class="p">();</span></td>
      </tr>
      <tr>
        <td id="L171" class="blob-num js-line-number" data-line-number="171"></td>
        <td id="LC171" class="blob-code js-file-line">			<span class="nx">versionType</span><span class="p">.</span><span class="nx">major</span> <span class="o">=</span> <span class="nx">versionArray</span><span class="p">.</span><span class="nx">pop</span><span class="p">();</span></td>
      </tr>
      <tr>
        <td id="L172" class="blob-num js-line-number" data-line-number="172"></td>
        <td id="LC172" class="blob-code js-file-line">			<span class="k">if</span> <span class="p">(</span><span class="nx">versionArray</span><span class="p">.</span><span class="nx">length</span> <span class="o">&gt;</span> <span class="mi">0</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L173" class="blob-num js-line-number" data-line-number="173"></td>
        <td id="LC173" class="blob-code js-file-line">				<span class="nx">versionType</span><span class="p">.</span><span class="nx">minor</span> <span class="o">=</span> <span class="nx">versionArray</span><span class="p">.</span><span class="nx">pop</span><span class="p">();</span></td>
      </tr>
      <tr>
        <td id="L174" class="blob-num js-line-number" data-line-number="174"></td>
        <td id="LC174" class="blob-code js-file-line">				<span class="k">if</span> <span class="p">(</span><span class="nx">versionArray</span><span class="p">.</span><span class="nx">length</span> <span class="o">&gt;</span> <span class="mi">0</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L175" class="blob-num js-line-number" data-line-number="175"></td>
        <td id="LC175" class="blob-code js-file-line">					<span class="nx">versionArray</span> <span class="o">=</span> <span class="nx">versionArray</span><span class="p">.</span><span class="nx">reverse</span><span class="p">();</span></td>
      </tr>
      <tr>
        <td id="L176" class="blob-num js-line-number" data-line-number="176"></td>
        <td id="LC176" class="blob-code js-file-line">					<span class="nx">versionType</span><span class="p">.</span><span class="nx">patch</span> <span class="o">=</span> <span class="nx">versionArray</span><span class="p">.</span><span class="nx">join</span><span class="p">(</span><span class="s2">&quot;.&quot;</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L177" class="blob-num js-line-number" data-line-number="177"></td>
        <td id="LC177" class="blob-code js-file-line">				<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L178" class="blob-num js-line-number" data-line-number="178"></td>
        <td id="LC178" class="blob-code js-file-line">					<span class="nx">versionType</span><span class="p">.</span><span class="nx">patch</span> <span class="o">=</span> <span class="s2">&quot;0&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L179" class="blob-num js-line-number" data-line-number="179"></td>
        <td id="LC179" class="blob-code js-file-line">				<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L180" class="blob-num js-line-number" data-line-number="180"></td>
        <td id="LC180" class="blob-code js-file-line">			<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L181" class="blob-num js-line-number" data-line-number="181"></td>
        <td id="LC181" class="blob-code js-file-line">				<span class="nx">versionType</span><span class="p">.</span><span class="nx">minor</span> <span class="o">=</span> <span class="s2">&quot;0&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L182" class="blob-num js-line-number" data-line-number="182"></td>
        <td id="LC182" class="blob-code js-file-line">			<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L183" class="blob-num js-line-number" data-line-number="183"></td>
        <td id="LC183" class="blob-code js-file-line">		<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L184" class="blob-num js-line-number" data-line-number="184"></td>
        <td id="LC184" class="blob-code js-file-line">			<span class="nx">versionType</span><span class="p">.</span><span class="nx">major</span> <span class="o">=</span> <span class="s2">&quot;0&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L185" class="blob-num js-line-number" data-line-number="185"></td>
        <td id="LC185" class="blob-code js-file-line">		<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L186" class="blob-num js-line-number" data-line-number="186"></td>
        <td id="LC186" class="blob-code js-file-line">	<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L187" class="blob-num js-line-number" data-line-number="187"></td>
        <td id="LC187" class="blob-code js-file-line">
</td>
      </tr>
      <tr>
        <td id="L188" class="blob-num js-line-number" data-line-number="188"></td>
        <td id="LC188" class="blob-code js-file-line">	<span class="kd">function</span> <span class="nx">detect</span><span class="p">(</span><span class="nx">opt</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L189" class="blob-num js-line-number" data-line-number="189"></td>
        <td id="LC189" class="blob-code js-file-line">		<span class="c1">// Create Global &quot;extend&quot; method, so Detectizr does not need jQuery.extend</span></td>
      </tr>
      <tr>
        <td id="L190" class="blob-num js-line-number" data-line-number="190"></td>
        <td id="LC190" class="blob-code js-file-line">		<span class="kd">var</span> <span class="nx">that</span> <span class="o">=</span> <span class="k">this</span><span class="p">,</span></td>
      </tr>
      <tr>
        <td id="L191" class="blob-num js-line-number" data-line-number="191"></td>
        <td id="LC191" class="blob-code js-file-line">			<span class="nx">i</span><span class="p">,</span> <span class="nx">j</span><span class="p">,</span> <span class="nx">k</span><span class="p">,</span> <span class="nx">device</span><span class="p">,</span> <span class="nx">os</span><span class="p">,</span> <span class="nx">browser</span><span class="p">,</span> <span class="nx">plugin2detect</span><span class="p">,</span> <span class="nx">pluginFound</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L192" class="blob-num js-line-number" data-line-number="192"></td>
        <td id="LC192" class="blob-code js-file-line">		<span class="nx">options</span> <span class="o">=</span> <span class="nx">extend</span><span class="p">({},</span> <span class="nx">options</span><span class="p">,</span> <span class="nx">opt</span> <span class="o">||</span> <span class="p">{});</span></td>
      </tr>
      <tr>
        <td id="L193" class="blob-num js-line-number" data-line-number="193"></td>
        <td id="LC193" class="blob-code js-file-line">
</td>
      </tr>
      <tr>
        <td id="L194" class="blob-num js-line-number" data-line-number="194"></td>
        <td id="LC194" class="blob-code js-file-line">		<span class="cm">/** Device detection **/</span></td>
      </tr>
      <tr>
        <td id="L195" class="blob-num js-line-number" data-line-number="195"></td>
        <td id="LC195" class="blob-code js-file-line">		<span class="k">if</span> <span class="p">(</span><span class="nx">options</span><span class="p">.</span><span class="nx">detectDevice</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L196" class="blob-num js-line-number" data-line-number="196"></td>
        <td id="LC196" class="blob-code js-file-line">			<span class="nx">Detectizr</span><span class="p">.</span><span class="nx">device</span> <span class="o">=</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L197" class="blob-num js-line-number" data-line-number="197"></td>
        <td id="LC197" class="blob-code js-file-line">				<span class="nx">type</span><span class="o">:</span> <span class="s2">&quot;&quot;</span><span class="p">,</span></td>
      </tr>
      <tr>
        <td id="L198" class="blob-num js-line-number" data-line-number="198"></td>
        <td id="LC198" class="blob-code js-file-line">				<span class="nx">model</span><span class="o">:</span> <span class="s2">&quot;&quot;</span><span class="p">,</span></td>
      </tr>
      <tr>
        <td id="L199" class="blob-num js-line-number" data-line-number="199"></td>
        <td id="LC199" class="blob-code js-file-line">				<span class="nx">orientation</span><span class="o">:</span> <span class="s2">&quot;&quot;</span></td>
      </tr>
      <tr>
        <td id="L200" class="blob-num js-line-number" data-line-number="200"></td>
        <td id="LC200" class="blob-code js-file-line">			<span class="p">};</span></td>
      </tr>
      <tr>
        <td id="L201" class="blob-num js-line-number" data-line-number="201"></td>
        <td id="LC201" class="blob-code js-file-line">			<span class="nx">device</span> <span class="o">=</span> <span class="nx">Detectizr</span><span class="p">.</span><span class="nx">device</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L202" class="blob-num js-line-number" data-line-number="202"></td>
        <td id="LC202" class="blob-code js-file-line">			<span class="k">if</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/googletv|smarttv|internet.tv|netcast|nettv|appletv|boxee|kylo|roku|dlnadoc|ce\-html/</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L203" class="blob-num js-line-number" data-line-number="203"></td>
        <td id="LC203" class="blob-code js-file-line">				<span class="c1">// Check if user agent is a smart tv</span></td>
      </tr>
      <tr>
        <td id="L204" class="blob-num js-line-number" data-line-number="204"></td>
        <td id="LC204" class="blob-code js-file-line">				<span class="nx">device</span><span class="p">.</span><span class="nx">type</span> <span class="o">=</span> <span class="nx">deviceTypes</span><span class="p">[</span><span class="mi">0</span><span class="p">];</span></td>
      </tr>
      <tr>
        <td id="L205" class="blob-num js-line-number" data-line-number="205"></td>
        <td id="LC205" class="blob-code js-file-line">				<span class="nx">device</span><span class="p">.</span><span class="nx">model</span> <span class="o">=</span> <span class="s2">&quot;smartTv&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L206" class="blob-num js-line-number" data-line-number="206"></td>
        <td id="LC206" class="blob-code js-file-line">			<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/xbox|playstation.3|wii/</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L207" class="blob-num js-line-number" data-line-number="207"></td>
        <td id="LC207" class="blob-code js-file-line">				<span class="c1">// Check if user agent is a game console</span></td>
      </tr>
      <tr>
        <td id="L208" class="blob-num js-line-number" data-line-number="208"></td>
        <td id="LC208" class="blob-code js-file-line">				<span class="nx">device</span><span class="p">.</span><span class="nx">type</span> <span class="o">=</span> <span class="nx">deviceTypes</span><span class="p">[</span><span class="mi">0</span><span class="p">];</span></td>
      </tr>
      <tr>
        <td id="L209" class="blob-num js-line-number" data-line-number="209"></td>
        <td id="LC209" class="blob-code js-file-line">				<span class="nx">device</span><span class="p">.</span><span class="nx">model</span> <span class="o">=</span> <span class="s2">&quot;gameConsole&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L210" class="blob-num js-line-number" data-line-number="210"></td>
        <td id="LC210" class="blob-code js-file-line">			<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/ip(a|ro)d/</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L211" class="blob-num js-line-number" data-line-number="211"></td>
        <td id="LC211" class="blob-code js-file-line">				<span class="c1">// Check if user agent is a iPad</span></td>
      </tr>
      <tr>
        <td id="L212" class="blob-num js-line-number" data-line-number="212"></td>
        <td id="LC212" class="blob-code js-file-line">				<span class="nx">device</span><span class="p">.</span><span class="nx">type</span> <span class="o">=</span> <span class="nx">deviceTypes</span><span class="p">[</span><span class="mi">1</span><span class="p">];</span></td>
      </tr>
      <tr>
        <td id="L213" class="blob-num js-line-number" data-line-number="213"></td>
        <td id="LC213" class="blob-code js-file-line">				<span class="nx">device</span><span class="p">.</span><span class="nx">model</span> <span class="o">=</span> <span class="s2">&quot;ipad&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L214" class="blob-num js-line-number" data-line-number="214"></td>
        <td id="LC214" class="blob-code js-file-line">			<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">((</span><span class="nx">test</span><span class="p">(</span><span class="sr">/tablet/</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="o">!</span><span class="nx">test</span><span class="p">(</span><span class="sr">/rx-34/</span><span class="p">))</span> <span class="o">||</span> <span class="nx">test</span><span class="p">(</span><span class="sr">/folio/</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L215" class="blob-num js-line-number" data-line-number="215"></td>
        <td id="LC215" class="blob-code js-file-line">				<span class="c1">// Check if user agent is a Tablet</span></td>
      </tr>
      <tr>
        <td id="L216" class="blob-num js-line-number" data-line-number="216"></td>
        <td id="LC216" class="blob-code js-file-line">				<span class="nx">device</span><span class="p">.</span><span class="nx">type</span> <span class="o">=</span> <span class="nx">deviceTypes</span><span class="p">[</span><span class="mi">1</span><span class="p">];</span></td>
      </tr>
      <tr>
        <td id="L217" class="blob-num js-line-number" data-line-number="217"></td>
        <td id="LC217" class="blob-code js-file-line">				<span class="nx">device</span><span class="p">.</span><span class="nx">model</span> <span class="o">=</span> <span class="nb">String</span><span class="p">(</span><span class="nx">exec</span><span class="p">(</span><span class="sr">/playbook/</span><span class="p">)</span> <span class="o">||</span> <span class="s2">&quot;&quot;</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L218" class="blob-num js-line-number" data-line-number="218"></td>
        <td id="LC218" class="blob-code js-file-line">			<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/linux/</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="nx">test</span><span class="p">(</span><span class="sr">/android/</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="o">!</span><span class="nx">test</span><span class="p">(</span><span class="sr">/fennec|mobi|htc.magic|htcX06ht|nexus.one|sc-02b|fone.945/</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L219" class="blob-num js-line-number" data-line-number="219"></td>
        <td id="LC219" class="blob-code js-file-line">				<span class="c1">// Check if user agent is an Android Tablet</span></td>
      </tr>
      <tr>
        <td id="L220" class="blob-num js-line-number" data-line-number="220"></td>
        <td id="LC220" class="blob-code js-file-line">				<span class="nx">device</span><span class="p">.</span><span class="nx">type</span> <span class="o">=</span> <span class="nx">deviceTypes</span><span class="p">[</span><span class="mi">1</span><span class="p">];</span></td>
      </tr>
      <tr>
        <td id="L221" class="blob-num js-line-number" data-line-number="221"></td>
        <td id="LC221" class="blob-code js-file-line">				<span class="nx">device</span><span class="p">.</span><span class="nx">model</span> <span class="o">=</span> <span class="s2">&quot;android&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L222" class="blob-num js-line-number" data-line-number="222"></td>
        <td id="LC222" class="blob-code js-file-line">			<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/kindle/</span><span class="p">)</span> <span class="o">||</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/mac.os/</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="nx">test</span><span class="p">(</span><span class="sr">/silk/</span><span class="p">)))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L223" class="blob-num js-line-number" data-line-number="223"></td>
        <td id="LC223" class="blob-code js-file-line">				<span class="c1">// Check if user agent is a Kindle or Kindle Fire</span></td>
      </tr>
      <tr>
        <td id="L224" class="blob-num js-line-number" data-line-number="224"></td>
        <td id="LC224" class="blob-code js-file-line">				<span class="nx">device</span><span class="p">.</span><span class="nx">type</span> <span class="o">=</span> <span class="nx">deviceTypes</span><span class="p">[</span><span class="mi">1</span><span class="p">];</span></td>
      </tr>
      <tr>
        <td id="L225" class="blob-num js-line-number" data-line-number="225"></td>
        <td id="LC225" class="blob-code js-file-line">				<span class="nx">device</span><span class="p">.</span><span class="nx">model</span> <span class="o">=</span> <span class="s2">&quot;kindle&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L226" class="blob-num js-line-number" data-line-number="226"></td>
        <td id="LC226" class="blob-code js-file-line">			<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/gt-p10|sc-01c|shw-m180s|sgh-t849|sch-i800|shw-m180l|sph-p100|sgh-i987|zt180|htc(.flyer|\_flyer)|sprint.atp51|viewpad7|pandigital(sprnova|nova)|ideos.s7|dell.streak.7|advent.vega|a101it|a70bht|mid7015|next2|nook/</span><span class="p">)</span> <span class="o">||</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/mb511/</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="nx">test</span><span class="p">(</span><span class="sr">/rutem/</span><span class="p">)))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L227" class="blob-num js-line-number" data-line-number="227"></td>
        <td id="LC227" class="blob-code js-file-line">				<span class="c1">// Check if user agent is a pre Android 3.0 Tablet</span></td>
      </tr>
      <tr>
        <td id="L228" class="blob-num js-line-number" data-line-number="228"></td>
        <td id="LC228" class="blob-code js-file-line">				<span class="nx">device</span><span class="p">.</span><span class="nx">type</span> <span class="o">=</span> <span class="nx">deviceTypes</span><span class="p">[</span><span class="mi">1</span><span class="p">];</span></td>
      </tr>
      <tr>
        <td id="L229" class="blob-num js-line-number" data-line-number="229"></td>
        <td id="LC229" class="blob-code js-file-line">				<span class="nx">device</span><span class="p">.</span><span class="nx">model</span> <span class="o">=</span> <span class="s2">&quot;android&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L230" class="blob-num js-line-number" data-line-number="230"></td>
        <td id="LC230" class="blob-code js-file-line">			<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/bb10/</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L231" class="blob-num js-line-number" data-line-number="231"></td>
        <td id="LC231" class="blob-code js-file-line">				<span class="c1">// Check if user agent is a BB10 device</span></td>
      </tr>
      <tr>
        <td id="L232" class="blob-num js-line-number" data-line-number="232"></td>
        <td id="LC232" class="blob-code js-file-line">				<span class="nx">device</span><span class="p">.</span><span class="nx">type</span> <span class="o">=</span> <span class="nx">deviceTypes</span><span class="p">[</span><span class="mi">1</span><span class="p">];</span></td>
      </tr>
      <tr>
        <td id="L233" class="blob-num js-line-number" data-line-number="233"></td>
        <td id="LC233" class="blob-code js-file-line">				<span class="nx">device</span><span class="p">.</span><span class="nx">model</span> <span class="o">=</span> <span class="s2">&quot;blackberry&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L234" class="blob-num js-line-number" data-line-number="234"></td>
        <td id="LC234" class="blob-code js-file-line">			<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L235" class="blob-num js-line-number" data-line-number="235"></td>
        <td id="LC235" class="blob-code js-file-line">				<span class="c1">// Check if user agent is one of common mobile types</span></td>
      </tr>
      <tr>
        <td id="L236" class="blob-num js-line-number" data-line-number="236"></td>
        <td id="LC236" class="blob-code js-file-line">				<span class="nx">device</span><span class="p">.</span><span class="nx">model</span> <span class="o">=</span> <span class="nx">exec</span><span class="p">(</span><span class="sr">/iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec|j2me/</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L237" class="blob-num js-line-number" data-line-number="237"></td>
        <td id="LC237" class="blob-code js-file-line">				<span class="k">if</span> <span class="p">(</span><span class="nx">device</span><span class="p">.</span><span class="nx">model</span> <span class="o">!==</span> <span class="kc">null</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L238" class="blob-num js-line-number" data-line-number="238"></td>
        <td id="LC238" class="blob-code js-file-line">					<span class="nx">device</span><span class="p">.</span><span class="nx">type</span> <span class="o">=</span> <span class="nx">deviceTypes</span><span class="p">[</span><span class="mi">2</span><span class="p">];</span></td>
      </tr>
      <tr>
        <td id="L239" class="blob-num js-line-number" data-line-number="239"></td>
        <td id="LC239" class="blob-code js-file-line">					<span class="nx">device</span><span class="p">.</span><span class="nx">model</span> <span class="o">=</span> <span class="nb">String</span><span class="p">(</span><span class="nx">device</span><span class="p">.</span><span class="nx">model</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L240" class="blob-num js-line-number" data-line-number="240"></td>
        <td id="LC240" class="blob-code js-file-line">				<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L241" class="blob-num js-line-number" data-line-number="241"></td>
        <td id="LC241" class="blob-code js-file-line">					<span class="nx">device</span><span class="p">.</span><span class="nx">model</span> <span class="o">=</span> <span class="s2">&quot;&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L242" class="blob-num js-line-number" data-line-number="242"></td>
        <td id="LC242" class="blob-code js-file-line">					<span class="k">if</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/bolt|fennec|iris|maemo|minimo|mobi|mowser|netfront|novarra|prism|rx-34|skyfire|tear|xv6875|xv6975|google.wireless.transcoder/</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L243" class="blob-num js-line-number" data-line-number="243"></td>
        <td id="LC243" class="blob-code js-file-line">						<span class="c1">// Check if user agent is unique Mobile User Agent</span></td>
      </tr>
      <tr>
        <td id="L244" class="blob-num js-line-number" data-line-number="244"></td>
        <td id="LC244" class="blob-code js-file-line">						<span class="nx">device</span><span class="p">.</span><span class="nx">type</span> <span class="o">=</span> <span class="nx">deviceTypes</span><span class="p">[</span><span class="mi">2</span><span class="p">];</span></td>
      </tr>
      <tr>
        <td id="L245" class="blob-num js-line-number" data-line-number="245"></td>
        <td id="LC245" class="blob-code js-file-line">					<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/opera/</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="nx">test</span><span class="p">(</span><span class="sr">/windows.nt.5/</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="nx">test</span><span class="p">(</span><span class="sr">/htc|xda|mini|vario|samsung\-gt\-i8000|samsung\-sgh\-i9/</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L246" class="blob-num js-line-number" data-line-number="246"></td>
        <td id="LC246" class="blob-code js-file-line">						<span class="c1">// Check if user agent is an odd Opera User Agent - http://goo.gl/nK90K</span></td>
      </tr>
      <tr>
        <td id="L247" class="blob-num js-line-number" data-line-number="247"></td>
        <td id="LC247" class="blob-code js-file-line">						<span class="nx">device</span><span class="p">.</span><span class="nx">type</span> <span class="o">=</span> <span class="nx">deviceTypes</span><span class="p">[</span><span class="mi">2</span><span class="p">];</span></td>
      </tr>
      <tr>
        <td id="L248" class="blob-num js-line-number" data-line-number="248"></td>
        <td id="LC248" class="blob-code js-file-line">					<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">((</span><span class="nx">test</span><span class="p">(</span><span class="sr">/windows.(nt|xp|me|9)/</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="o">!</span><span class="nx">test</span><span class="p">(</span><span class="sr">/phone/</span><span class="p">))</span> <span class="o">||</span> <span class="nx">test</span><span class="p">(</span><span class="sr">/win(9|.9|nt)/</span><span class="p">)</span> <span class="o">||</span> <span class="nx">test</span><span class="p">(</span><span class="sr">/\(windows 8\)/</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L249" class="blob-num js-line-number" data-line-number="249"></td>
        <td id="LC249" class="blob-code js-file-line">						<span class="c1">// Check if user agent is Windows Desktop, &quot;(Windows 8)&quot; Chrome extra exception</span></td>
      </tr>
      <tr>
        <td id="L250" class="blob-num js-line-number" data-line-number="250"></td>
        <td id="LC250" class="blob-code js-file-line">						<span class="nx">device</span><span class="p">.</span><span class="nx">type</span> <span class="o">=</span> <span class="nx">deviceTypes</span><span class="p">[</span><span class="mi">3</span><span class="p">];</span></td>
      </tr>
      <tr>
        <td id="L251" class="blob-num js-line-number" data-line-number="251"></td>
        <td id="LC251" class="blob-code js-file-line">					<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/macintosh|powerpc/</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="o">!</span><span class="nx">test</span><span class="p">(</span><span class="sr">/silk/</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L252" class="blob-num js-line-number" data-line-number="252"></td>
        <td id="LC252" class="blob-code js-file-line">						<span class="c1">// Check if agent is Mac Desktop</span></td>
      </tr>
      <tr>
        <td id="L253" class="blob-num js-line-number" data-line-number="253"></td>
        <td id="LC253" class="blob-code js-file-line">						<span class="nx">device</span><span class="p">.</span><span class="nx">type</span> <span class="o">=</span> <span class="nx">deviceTypes</span><span class="p">[</span><span class="mi">3</span><span class="p">];</span></td>
      </tr>
      <tr>
        <td id="L254" class="blob-num js-line-number" data-line-number="254"></td>
        <td id="LC254" class="blob-code js-file-line">						<span class="nx">device</span><span class="p">.</span><span class="nx">model</span> <span class="o">=</span> <span class="s2">&quot;mac&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L255" class="blob-num js-line-number" data-line-number="255"></td>
        <td id="LC255" class="blob-code js-file-line">					<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/linux/</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="nx">test</span><span class="p">(</span><span class="sr">/x11/</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L256" class="blob-num js-line-number" data-line-number="256"></td>
        <td id="LC256" class="blob-code js-file-line">						<span class="c1">// Check if user agent is a Linux Desktop</span></td>
      </tr>
      <tr>
        <td id="L257" class="blob-num js-line-number" data-line-number="257"></td>
        <td id="LC257" class="blob-code js-file-line">						<span class="nx">device</span><span class="p">.</span><span class="nx">type</span> <span class="o">=</span> <span class="nx">deviceTypes</span><span class="p">[</span><span class="mi">3</span><span class="p">];</span></td>
      </tr>
      <tr>
        <td id="L258" class="blob-num js-line-number" data-line-number="258"></td>
        <td id="LC258" class="blob-code js-file-line">					<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/solaris|sunos|bsd/</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L259" class="blob-num js-line-number" data-line-number="259"></td>
        <td id="LC259" class="blob-code js-file-line">						<span class="c1">// Check if user agent is a Solaris, SunOS, BSD Desktop</span></td>
      </tr>
      <tr>
        <td id="L260" class="blob-num js-line-number" data-line-number="260"></td>
        <td id="LC260" class="blob-code js-file-line">						<span class="nx">device</span><span class="p">.</span><span class="nx">type</span> <span class="o">=</span> <span class="nx">deviceTypes</span><span class="p">[</span><span class="mi">3</span><span class="p">];</span></td>
      </tr>
      <tr>
        <td id="L261" class="blob-num js-line-number" data-line-number="261"></td>
        <td id="LC261" class="blob-code js-file-line">					<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/bot|crawler|spider|yahoo|ia_archiver|covario-ids|findlinks|dataparksearch|larbin|mediapartners-google|ng-search|snappy|teoma|jeeves|tineye/</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="o">!</span><span class="nx">test</span><span class="p">(</span><span class="sr">/mobile/</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L262" class="blob-num js-line-number" data-line-number="262"></td>
        <td id="LC262" class="blob-code js-file-line">						<span class="c1">// Check if user agent is a Desktop BOT/Crawler/Spider</span></td>
      </tr>
      <tr>
        <td id="L263" class="blob-num js-line-number" data-line-number="263"></td>
        <td id="LC263" class="blob-code js-file-line">						<span class="nx">device</span><span class="p">.</span><span class="nx">type</span> <span class="o">=</span> <span class="nx">deviceTypes</span><span class="p">[</span><span class="mi">3</span><span class="p">];</span></td>
      </tr>
      <tr>
        <td id="L264" class="blob-num js-line-number" data-line-number="264"></td>
        <td id="LC264" class="blob-code js-file-line">						<span class="nx">device</span><span class="p">.</span><span class="nx">model</span> <span class="o">=</span> <span class="s2">&quot;crawler&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L265" class="blob-num js-line-number" data-line-number="265"></td>
        <td id="LC265" class="blob-code js-file-line">					<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L266" class="blob-num js-line-number" data-line-number="266"></td>
        <td id="LC266" class="blob-code js-file-line">						<span class="c1">// Otherwise assume it is a Mobile Device</span></td>
      </tr>
      <tr>
        <td id="L267" class="blob-num js-line-number" data-line-number="267"></td>
        <td id="LC267" class="blob-code js-file-line">						<span class="nx">device</span><span class="p">.</span><span class="nx">type</span> <span class="o">=</span> <span class="nx">deviceTypes</span><span class="p">[</span><span class="mi">2</span><span class="p">];</span></td>
      </tr>
      <tr>
        <td id="L268" class="blob-num js-line-number" data-line-number="268"></td>
        <td id="LC268" class="blob-code js-file-line">					<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L269" class="blob-num js-line-number" data-line-number="269"></td>
        <td id="LC269" class="blob-code js-file-line">				<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L270" class="blob-num js-line-number" data-line-number="270"></td>
        <td id="LC270" class="blob-code js-file-line">			<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L271" class="blob-num js-line-number" data-line-number="271"></td>
        <td id="LC271" class="blob-code js-file-line">			<span class="k">for</span> <span class="p">(</span><span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">j</span> <span class="o">=</span> <span class="nx">deviceTypes</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">j</span><span class="p">;</span> <span class="nx">i</span> <span class="o">+=</span> <span class="mi">1</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L272" class="blob-num js-line-number" data-line-number="272"></td>
        <td id="LC272" class="blob-code js-file-line">				<span class="nx">addConditionalTest</span><span class="p">(</span><span class="nx">deviceTypes</span><span class="p">[</span><span class="nx">i</span><span class="p">],</span> <span class="p">(</span><span class="nx">device</span><span class="p">.</span><span class="nx">type</span> <span class="o">===</span> <span class="nx">deviceTypes</span><span class="p">[</span><span class="nx">i</span><span class="p">]));</span></td>
      </tr>
      <tr>
        <td id="L273" class="blob-num js-line-number" data-line-number="273"></td>
        <td id="LC273" class="blob-code js-file-line">			<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L274" class="blob-num js-line-number" data-line-number="274"></td>
        <td id="LC274" class="blob-code js-file-line">			<span class="k">if</span> <span class="p">(</span><span class="nx">options</span><span class="p">.</span><span class="nx">detectDeviceModel</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L275" class="blob-num js-line-number" data-line-number="275"></td>
        <td id="LC275" class="blob-code js-file-line">				<span class="nx">addConditionalTest</span><span class="p">(</span><span class="nx">toCamel</span><span class="p">(</span><span class="nx">device</span><span class="p">.</span><span class="nx">model</span><span class="p">),</span> <span class="kc">true</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L276" class="blob-num js-line-number" data-line-number="276"></td>
        <td id="LC276" class="blob-code js-file-line">			<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L277" class="blob-num js-line-number" data-line-number="277"></td>
        <td id="LC277" class="blob-code js-file-line">		<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L278" class="blob-num js-line-number" data-line-number="278"></td>
        <td id="LC278" class="blob-code js-file-line">
</td>
      </tr>
      <tr>
        <td id="L279" class="blob-num js-line-number" data-line-number="279"></td>
        <td id="LC279" class="blob-code js-file-line">		<span class="cm">/** Screen detection **/</span></td>
      </tr>
      <tr>
        <td id="L280" class="blob-num js-line-number" data-line-number="280"></td>
        <td id="LC280" class="blob-code js-file-line">		<span class="k">if</span> <span class="p">(</span><span class="nx">options</span><span class="p">.</span><span class="nx">detectScreen</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L281" class="blob-num js-line-number" data-line-number="281"></td>
        <td id="LC281" class="blob-code js-file-line">			<span class="k">if</span> <span class="p">(</span> <span class="o">!!</span><span class="nx">Modernizr</span> <span class="o">&amp;&amp;</span> <span class="o">!!</span><span class="nx">Modernizr</span><span class="p">.</span><span class="nx">mq</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L282" class="blob-num js-line-number" data-line-number="282"></td>
        <td id="LC282" class="blob-code js-file-line">				<span class="nx">addConditionalTest</span><span class="p">(</span><span class="s2">&quot;smallScreen&quot;</span><span class="p">,</span> <span class="nx">Modernizr</span><span class="p">.</span><span class="nx">mq</span><span class="p">(</span><span class="s2">&quot;only screen and (max-width: 480px)&quot;</span><span class="p">));</span></td>
      </tr>
      <tr>
        <td id="L283" class="blob-num js-line-number" data-line-number="283"></td>
        <td id="LC283" class="blob-code js-file-line">				<span class="nx">addConditionalTest</span><span class="p">(</span><span class="s2">&quot;verySmallScreen&quot;</span><span class="p">,</span> <span class="nx">Modernizr</span><span class="p">.</span><span class="nx">mq</span><span class="p">(</span><span class="s2">&quot;only screen and (max-width: 320px)&quot;</span><span class="p">));</span></td>
      </tr>
      <tr>
        <td id="L284" class="blob-num js-line-number" data-line-number="284"></td>
        <td id="LC284" class="blob-code js-file-line">				<span class="nx">addConditionalTest</span><span class="p">(</span><span class="s2">&quot;veryVerySmallScreen&quot;</span><span class="p">,</span> <span class="nx">Modernizr</span><span class="p">.</span><span class="nx">mq</span><span class="p">(</span><span class="s2">&quot;only screen and (max-width: 240px)&quot;</span><span class="p">));</span></td>
      </tr>
      <tr>
        <td id="L285" class="blob-num js-line-number" data-line-number="285"></td>
        <td id="LC285" class="blob-code js-file-line">			<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L286" class="blob-num js-line-number" data-line-number="286"></td>
        <td id="LC286" class="blob-code js-file-line">			<span class="k">if</span> <span class="p">(</span><span class="nx">device</span><span class="p">.</span><span class="nx">type</span> <span class="o">===</span> <span class="nx">deviceTypes</span><span class="p">[</span><span class="mi">1</span><span class="p">]</span> <span class="o">||</span> <span class="nx">device</span><span class="p">.</span><span class="nx">type</span> <span class="o">===</span> <span class="nx">deviceTypes</span><span class="p">[</span><span class="mi">2</span><span class="p">])</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L287" class="blob-num js-line-number" data-line-number="287"></td>
        <td id="LC287" class="blob-code js-file-line">				<span class="nb">window</span><span class="p">.</span><span class="nx">onresize</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L288" class="blob-num js-line-number" data-line-number="288"></td>
        <td id="LC288" class="blob-code js-file-line">					<span class="nx">checkOrientation</span><span class="p">(</span><span class="nx">event</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L289" class="blob-num js-line-number" data-line-number="289"></td>
        <td id="LC289" class="blob-code js-file-line">				<span class="p">};</span></td>
      </tr>
      <tr>
        <td id="L290" class="blob-num js-line-number" data-line-number="290"></td>
        <td id="LC290" class="blob-code js-file-line">				<span class="nx">checkOrientation</span><span class="p">();</span></td>
      </tr>
      <tr>
        <td id="L291" class="blob-num js-line-number" data-line-number="291"></td>
        <td id="LC291" class="blob-code js-file-line">			<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L292" class="blob-num js-line-number" data-line-number="292"></td>
        <td id="LC292" class="blob-code js-file-line">				<span class="nx">device</span><span class="p">.</span><span class="nx">orientation</span> <span class="o">=</span> <span class="s2">&quot;landscape&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L293" class="blob-num js-line-number" data-line-number="293"></td>
        <td id="LC293" class="blob-code js-file-line">				<span class="nx">addConditionalTest</span><span class="p">(</span><span class="nx">device</span><span class="p">.</span><span class="nx">orientation</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L294" class="blob-num js-line-number" data-line-number="294"></td>
        <td id="LC294" class="blob-code js-file-line">			<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L295" class="blob-num js-line-number" data-line-number="295"></td>
        <td id="LC295" class="blob-code js-file-line">		<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L296" class="blob-num js-line-number" data-line-number="296"></td>
        <td id="LC296" class="blob-code js-file-line">
</td>
      </tr>
      <tr>
        <td id="L297" class="blob-num js-line-number" data-line-number="297"></td>
        <td id="LC297" class="blob-code js-file-line">		<span class="cm">/** OS detection **/</span></td>
      </tr>
      <tr>
        <td id="L298" class="blob-num js-line-number" data-line-number="298"></td>
        <td id="LC298" class="blob-code js-file-line">		<span class="k">if</span> <span class="p">(</span><span class="nx">options</span><span class="p">.</span><span class="nx">detectOS</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L299" class="blob-num js-line-number" data-line-number="299"></td>
        <td id="LC299" class="blob-code js-file-line">			<span class="nx">Detectizr</span><span class="p">.</span><span class="nx">os</span> <span class="o">=</span> <span class="p">{};</span></td>
      </tr>
      <tr>
        <td id="L300" class="blob-num js-line-number" data-line-number="300"></td>
        <td id="LC300" class="blob-code js-file-line">			<span class="nx">os</span> <span class="o">=</span> <span class="nx">Detectizr</span><span class="p">.</span><span class="nx">os</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L301" class="blob-num js-line-number" data-line-number="301"></td>
        <td id="LC301" class="blob-code js-file-line">			<span class="k">if</span> <span class="p">(</span><span class="nx">device</span><span class="p">.</span><span class="nx">model</span> <span class="o">!==</span> <span class="s2">&quot;&quot;</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L302" class="blob-num js-line-number" data-line-number="302"></td>
        <td id="LC302" class="blob-code js-file-line">				<span class="k">if</span> <span class="p">(</span><span class="nx">device</span><span class="p">.</span><span class="nx">model</span> <span class="o">===</span> <span class="s2">&quot;ipad&quot;</span> <span class="o">||</span> <span class="nx">device</span><span class="p">.</span><span class="nx">model</span> <span class="o">===</span> <span class="s2">&quot;iphone&quot;</span> <span class="o">||</span> <span class="nx">device</span><span class="p">.</span><span class="nx">model</span> <span class="o">===</span> <span class="s2">&quot;ipod&quot;</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L303" class="blob-num js-line-number" data-line-number="303"></td>
        <td id="LC303" class="blob-code js-file-line">					<span class="nx">os</span><span class="p">.</span><span class="nx">name</span> <span class="o">=</span> <span class="s2">&quot;ios&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L304" class="blob-num js-line-number" data-line-number="304"></td>
        <td id="LC304" class="blob-code js-file-line">					<span class="nx">setVersion</span><span class="p">(</span><span class="nx">os</span><span class="p">,</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/os\s([\d_]+)/</span><span class="p">)</span> <span class="o">?</span> <span class="nb">RegExp</span><span class="p">.</span><span class="nx">$1</span> <span class="o">:</span> <span class="s2">&quot;&quot;</span><span class="p">).</span><span class="nx">replace</span><span class="p">(</span><span class="sr">/_/g</span><span class="p">,</span> <span class="s2">&quot;.&quot;</span><span class="p">));</span></td>
      </tr>
      <tr>
        <td id="L305" class="blob-num js-line-number" data-line-number="305"></td>
        <td id="LC305" class="blob-code js-file-line">				<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">device</span><span class="p">.</span><span class="nx">model</span> <span class="o">===</span> <span class="s2">&quot;android&quot;</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L306" class="blob-num js-line-number" data-line-number="306"></td>
        <td id="LC306" class="blob-code js-file-line">					<span class="nx">os</span><span class="p">.</span><span class="nx">name</span> <span class="o">=</span> <span class="s2">&quot;android&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L307" class="blob-num js-line-number" data-line-number="307"></td>
        <td id="LC307" class="blob-code js-file-line">					<span class="nx">setVersion</span><span class="p">(</span><span class="nx">os</span><span class="p">,</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/android\s([\d\.]+)/</span><span class="p">)</span> <span class="o">?</span> <span class="nb">RegExp</span><span class="p">.</span><span class="nx">$1</span> <span class="o">:</span> <span class="s2">&quot;&quot;</span><span class="p">));</span></td>
      </tr>
      <tr>
        <td id="L308" class="blob-num js-line-number" data-line-number="308"></td>
        <td id="LC308" class="blob-code js-file-line">				<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">device</span><span class="p">.</span><span class="nx">model</span> <span class="o">===</span> <span class="s2">&quot;blackberry&quot;</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L309" class="blob-num js-line-number" data-line-number="309"></td>
        <td id="LC309" class="blob-code js-file-line">					<span class="nx">os</span><span class="p">.</span><span class="nx">name</span> <span class="o">=</span> <span class="s2">&quot;blackberry&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L310" class="blob-num js-line-number" data-line-number="310"></td>
        <td id="LC310" class="blob-code js-file-line">					<span class="nx">setVersion</span><span class="p">(</span><span class="nx">os</span><span class="p">,</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/version\/([^\s]+)/</span><span class="p">)</span> <span class="o">?</span> <span class="nb">RegExp</span><span class="p">.</span><span class="nx">$1</span> <span class="o">:</span> <span class="s2">&quot;&quot;</span><span class="p">));</span></td>
      </tr>
      <tr>
        <td id="L311" class="blob-num js-line-number" data-line-number="311"></td>
        <td id="LC311" class="blob-code js-file-line">				<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">device</span><span class="p">.</span><span class="nx">model</span> <span class="o">===</span> <span class="s2">&quot;playbook&quot;</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L312" class="blob-num js-line-number" data-line-number="312"></td>
        <td id="LC312" class="blob-code js-file-line">					<span class="nx">os</span><span class="p">.</span><span class="nx">name</span> <span class="o">=</span> <span class="s2">&quot;blackberry&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L313" class="blob-num js-line-number" data-line-number="313"></td>
        <td id="LC313" class="blob-code js-file-line">					<span class="nx">setVersion</span><span class="p">(</span><span class="nx">os</span><span class="p">,</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/os ([^\s]+)/</span><span class="p">)</span> <span class="o">?</span> <span class="nb">RegExp</span><span class="p">.</span><span class="nx">$1</span><span class="p">.</span><span class="nx">replace</span><span class="p">(</span><span class="s2">&quot;;&quot;</span><span class="p">,</span> <span class="s2">&quot;&quot;</span><span class="p">)</span> <span class="o">:</span> <span class="s2">&quot;&quot;</span><span class="p">));</span></td>
      </tr>
      <tr>
        <td id="L314" class="blob-num js-line-number" data-line-number="314"></td>
        <td id="LC314" class="blob-code js-file-line">				<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L315" class="blob-num js-line-number" data-line-number="315"></td>
        <td id="LC315" class="blob-code js-file-line">			<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L316" class="blob-num js-line-number" data-line-number="316"></td>
        <td id="LC316" class="blob-code js-file-line">			<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">os</span><span class="p">.</span><span class="nx">name</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L317" class="blob-num js-line-number" data-line-number="317"></td>
        <td id="LC317" class="blob-code js-file-line">				<span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;win&quot;</span><span class="p">)</span> <span class="o">||</span> <span class="nx">is</span><span class="p">(</span><span class="s2">&quot;16bit&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L318" class="blob-num js-line-number" data-line-number="318"></td>
        <td id="LC318" class="blob-code js-file-line">					<span class="nx">os</span><span class="p">.</span><span class="nx">name</span> <span class="o">=</span> <span class="s2">&quot;windows&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L319" class="blob-num js-line-number" data-line-number="319"></td>
        <td id="LC319" class="blob-code js-file-line">					<span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;windows nt 6.3&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L320" class="blob-num js-line-number" data-line-number="320"></td>
        <td id="LC320" class="blob-code js-file-line">						<span class="nx">setVersion</span><span class="p">(</span><span class="nx">os</span><span class="p">,</span> <span class="s2">&quot;8.1&quot;</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L321" class="blob-num js-line-number" data-line-number="321"></td>
        <td id="LC321" class="blob-code js-file-line">					<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;windows nt 6.2&quot;</span><span class="p">)</span> <span class="o">||</span> <span class="nx">test</span><span class="p">(</span><span class="sr">/\(windows 8\)/</span><span class="p">))</span> <span class="p">{</span> <span class="c1">//windows 8 chrome mac fix</span></td>
      </tr>
      <tr>
        <td id="L322" class="blob-num js-line-number" data-line-number="322"></td>
        <td id="LC322" class="blob-code js-file-line">						<span class="nx">setVersion</span><span class="p">(</span><span class="nx">os</span><span class="p">,</span> <span class="s2">&quot;8&quot;</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L323" class="blob-num js-line-number" data-line-number="323"></td>
        <td id="LC323" class="blob-code js-file-line">					<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;windows nt 6.1&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L324" class="blob-num js-line-number" data-line-number="324"></td>
        <td id="LC324" class="blob-code js-file-line">						<span class="nx">setVersion</span><span class="p">(</span><span class="nx">os</span><span class="p">,</span> <span class="s2">&quot;7&quot;</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L325" class="blob-num js-line-number" data-line-number="325"></td>
        <td id="LC325" class="blob-code js-file-line">					<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;windows nt 6.0&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L326" class="blob-num js-line-number" data-line-number="326"></td>
        <td id="LC326" class="blob-code js-file-line">						<span class="nx">setVersion</span><span class="p">(</span><span class="nx">os</span><span class="p">,</span> <span class="s2">&quot;vista&quot;</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L327" class="blob-num js-line-number" data-line-number="327"></td>
        <td id="LC327" class="blob-code js-file-line">					<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;windows nt 5.2&quot;</span><span class="p">)</span> <span class="o">||</span> <span class="nx">is</span><span class="p">(</span><span class="s2">&quot;windows nt 5.1&quot;</span><span class="p">)</span> <span class="o">||</span> <span class="nx">is</span><span class="p">(</span><span class="s2">&quot;windows xp&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L328" class="blob-num js-line-number" data-line-number="328"></td>
        <td id="LC328" class="blob-code js-file-line">						<span class="nx">setVersion</span><span class="p">(</span><span class="nx">os</span><span class="p">,</span> <span class="s2">&quot;xp&quot;</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L329" class="blob-num js-line-number" data-line-number="329"></td>
        <td id="LC329" class="blob-code js-file-line">					<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;windows nt 5.0&quot;</span><span class="p">)</span> <span class="o">||</span> <span class="nx">is</span><span class="p">(</span><span class="s2">&quot;windows 2000&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L330" class="blob-num js-line-number" data-line-number="330"></td>
        <td id="LC330" class="blob-code js-file-line">						<span class="nx">setVersion</span><span class="p">(</span><span class="nx">os</span><span class="p">,</span> <span class="s2">&quot;2k&quot;</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L331" class="blob-num js-line-number" data-line-number="331"></td>
        <td id="LC331" class="blob-code js-file-line">					<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;winnt&quot;</span><span class="p">)</span> <span class="o">||</span> <span class="nx">is</span><span class="p">(</span><span class="s2">&quot;windows nt&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L332" class="blob-num js-line-number" data-line-number="332"></td>
        <td id="LC332" class="blob-code js-file-line">						<span class="nx">setVersion</span><span class="p">(</span><span class="nx">os</span><span class="p">,</span> <span class="s2">&quot;nt&quot;</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L333" class="blob-num js-line-number" data-line-number="333"></td>
        <td id="LC333" class="blob-code js-file-line">					<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;win98&quot;</span><span class="p">)</span> <span class="o">||</span> <span class="nx">is</span><span class="p">(</span><span class="s2">&quot;windows 98&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L334" class="blob-num js-line-number" data-line-number="334"></td>
        <td id="LC334" class="blob-code js-file-line">						<span class="nx">setVersion</span><span class="p">(</span><span class="nx">os</span><span class="p">,</span> <span class="s2">&quot;98&quot;</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L335" class="blob-num js-line-number" data-line-number="335"></td>
        <td id="LC335" class="blob-code js-file-line">					<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;win95&quot;</span><span class="p">)</span> <span class="o">||</span> <span class="nx">is</span><span class="p">(</span><span class="s2">&quot;windows 95&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L336" class="blob-num js-line-number" data-line-number="336"></td>
        <td id="LC336" class="blob-code js-file-line">						<span class="nx">setVersion</span><span class="p">(</span><span class="nx">os</span><span class="p">,</span> <span class="s2">&quot;95&quot;</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L337" class="blob-num js-line-number" data-line-number="337"></td>
        <td id="LC337" class="blob-code js-file-line">					<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L338" class="blob-num js-line-number" data-line-number="338"></td>
        <td id="LC338" class="blob-code js-file-line">				<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;mac&quot;</span><span class="p">)</span> <span class="o">||</span> <span class="nx">is</span><span class="p">(</span><span class="s2">&quot;darwin&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L339" class="blob-num js-line-number" data-line-number="339"></td>
        <td id="LC339" class="blob-code js-file-line">					<span class="nx">os</span><span class="p">.</span><span class="nx">name</span> <span class="o">=</span> <span class="s2">&quot;mac os&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L340" class="blob-num js-line-number" data-line-number="340"></td>
        <td id="LC340" class="blob-code js-file-line">					<span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;68k&quot;</span><span class="p">)</span> <span class="o">||</span> <span class="nx">is</span><span class="p">(</span><span class="s2">&quot;68000&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L341" class="blob-num js-line-number" data-line-number="341"></td>
        <td id="LC341" class="blob-code js-file-line">						<span class="nx">setVersion</span><span class="p">(</span><span class="nx">os</span><span class="p">,</span> <span class="s2">&quot;68k&quot;</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L342" class="blob-num js-line-number" data-line-number="342"></td>
        <td id="LC342" class="blob-code js-file-line">					<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;ppc&quot;</span><span class="p">)</span> <span class="o">||</span> <span class="nx">is</span><span class="p">(</span><span class="s2">&quot;powerpc&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L343" class="blob-num js-line-number" data-line-number="343"></td>
        <td id="LC343" class="blob-code js-file-line">						<span class="nx">setVersion</span><span class="p">(</span><span class="nx">os</span><span class="p">,</span> <span class="s2">&quot;ppc&quot;</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L344" class="blob-num js-line-number" data-line-number="344"></td>
        <td id="LC344" class="blob-code js-file-line">					<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;os x&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L345" class="blob-num js-line-number" data-line-number="345"></td>
        <td id="LC345" class="blob-code js-file-line">						<span class="nx">setVersion</span><span class="p">(</span><span class="nx">os</span><span class="p">,</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/os\sx\s([\d_]+)/</span><span class="p">)</span> <span class="o">?</span> <span class="nb">RegExp</span><span class="p">.</span><span class="nx">$1</span> <span class="o">:</span> <span class="s2">&quot;os x&quot;</span><span class="p">).</span><span class="nx">replace</span><span class="p">(</span><span class="sr">/_/g</span><span class="p">,</span> <span class="s2">&quot;.&quot;</span><span class="p">));</span></td>
      </tr>
      <tr>
        <td id="L346" class="blob-num js-line-number" data-line-number="346"></td>
        <td id="LC346" class="blob-code js-file-line">					<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L347" class="blob-num js-line-number" data-line-number="347"></td>
        <td id="LC347" class="blob-code js-file-line">				<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;webtv&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L348" class="blob-num js-line-number" data-line-number="348"></td>
        <td id="LC348" class="blob-code js-file-line">					<span class="nx">os</span><span class="p">.</span><span class="nx">name</span> <span class="o">=</span> <span class="s2">&quot;webtv&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L349" class="blob-num js-line-number" data-line-number="349"></td>
        <td id="LC349" class="blob-code js-file-line">				<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;x11&quot;</span><span class="p">)</span> <span class="o">||</span> <span class="nx">is</span><span class="p">(</span><span class="s2">&quot;inux&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L350" class="blob-num js-line-number" data-line-number="350"></td>
        <td id="LC350" class="blob-code js-file-line">					<span class="nx">os</span><span class="p">.</span><span class="nx">name</span> <span class="o">=</span> <span class="s2">&quot;linux&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L351" class="blob-num js-line-number" data-line-number="351"></td>
        <td id="LC351" class="blob-code js-file-line">				<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;sunos&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L352" class="blob-num js-line-number" data-line-number="352"></td>
        <td id="LC352" class="blob-code js-file-line">					<span class="nx">os</span><span class="p">.</span><span class="nx">name</span> <span class="o">=</span> <span class="s2">&quot;sun&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L353" class="blob-num js-line-number" data-line-number="353"></td>
        <td id="LC353" class="blob-code js-file-line">				<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;irix&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L354" class="blob-num js-line-number" data-line-number="354"></td>
        <td id="LC354" class="blob-code js-file-line">					<span class="nx">os</span><span class="p">.</span><span class="nx">name</span> <span class="o">=</span> <span class="s2">&quot;irix&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L355" class="blob-num js-line-number" data-line-number="355"></td>
        <td id="LC355" class="blob-code js-file-line">				<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;freebsd&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L356" class="blob-num js-line-number" data-line-number="356"></td>
        <td id="LC356" class="blob-code js-file-line">					<span class="nx">os</span><span class="p">.</span><span class="nx">name</span> <span class="o">=</span> <span class="s2">&quot;freebsd&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L357" class="blob-num js-line-number" data-line-number="357"></td>
        <td id="LC357" class="blob-code js-file-line">				<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;bsd&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L358" class="blob-num js-line-number" data-line-number="358"></td>
        <td id="LC358" class="blob-code js-file-line">					<span class="nx">os</span><span class="p">.</span><span class="nx">name</span> <span class="o">=</span> <span class="s2">&quot;bsd&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L359" class="blob-num js-line-number" data-line-number="359"></td>
        <td id="LC359" class="blob-code js-file-line">				<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L360" class="blob-num js-line-number" data-line-number="360"></td>
        <td id="LC360" class="blob-code js-file-line">			<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L361" class="blob-num js-line-number" data-line-number="361"></td>
        <td id="LC361" class="blob-code js-file-line">			<span class="k">if</span> <span class="p">(</span> <span class="o">!!</span><span class="nx">os</span><span class="p">.</span><span class="nx">name</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L362" class="blob-num js-line-number" data-line-number="362"></td>
        <td id="LC362" class="blob-code js-file-line">				<span class="nx">addConditionalTest</span><span class="p">(</span><span class="nx">os</span><span class="p">.</span><span class="nx">name</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L363" class="blob-num js-line-number" data-line-number="363"></td>
        <td id="LC363" class="blob-code js-file-line">				<span class="k">if</span> <span class="p">(</span> <span class="o">!!</span><span class="nx">os</span><span class="p">.</span><span class="nx">major</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L364" class="blob-num js-line-number" data-line-number="364"></td>
        <td id="LC364" class="blob-code js-file-line">					<span class="nx">addVersionTest</span><span class="p">(</span><span class="nx">os</span><span class="p">.</span><span class="nx">name</span><span class="p">,</span> <span class="nx">os</span><span class="p">.</span><span class="nx">major</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L365" class="blob-num js-line-number" data-line-number="365"></td>
        <td id="LC365" class="blob-code js-file-line">					<span class="k">if</span> <span class="p">(</span> <span class="o">!!</span><span class="nx">os</span><span class="p">.</span><span class="nx">minor</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L366" class="blob-num js-line-number" data-line-number="366"></td>
        <td id="LC366" class="blob-code js-file-line">						<span class="nx">addVersionTest</span><span class="p">(</span><span class="nx">os</span><span class="p">.</span><span class="nx">name</span><span class="p">,</span> <span class="nx">os</span><span class="p">.</span><span class="nx">major</span><span class="p">,</span> <span class="nx">os</span><span class="p">.</span><span class="nx">minor</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L367" class="blob-num js-line-number" data-line-number="367"></td>
        <td id="LC367" class="blob-code js-file-line">					<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L368" class="blob-num js-line-number" data-line-number="368"></td>
        <td id="LC368" class="blob-code js-file-line">				<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L369" class="blob-num js-line-number" data-line-number="369"></td>
        <td id="LC369" class="blob-code js-file-line">			<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L370" class="blob-num js-line-number" data-line-number="370"></td>
        <td id="LC370" class="blob-code js-file-line">			<span class="k">if</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/\sx64|\sx86|\swin64|\swow64|\samd64/</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L371" class="blob-num js-line-number" data-line-number="371"></td>
        <td id="LC371" class="blob-code js-file-line">				<span class="nx">os</span><span class="p">.</span><span class="nx">addressRegisterSize</span> <span class="o">=</span> <span class="s2">&quot;64bit&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L372" class="blob-num js-line-number" data-line-number="372"></td>
        <td id="LC372" class="blob-code js-file-line">			<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L373" class="blob-num js-line-number" data-line-number="373"></td>
        <td id="LC373" class="blob-code js-file-line">				<span class="nx">os</span><span class="p">.</span><span class="nx">addressRegisterSize</span> <span class="o">=</span> <span class="s2">&quot;32bit&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L374" class="blob-num js-line-number" data-line-number="374"></td>
        <td id="LC374" class="blob-code js-file-line">			<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L375" class="blob-num js-line-number" data-line-number="375"></td>
        <td id="LC375" class="blob-code js-file-line">			<span class="nx">addConditionalTest</span><span class="p">(</span><span class="nx">os</span><span class="p">.</span><span class="nx">addressRegisterSize</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L376" class="blob-num js-line-number" data-line-number="376"></td>
        <td id="LC376" class="blob-code js-file-line">		<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L377" class="blob-num js-line-number" data-line-number="377"></td>
        <td id="LC377" class="blob-code js-file-line">
</td>
      </tr>
      <tr>
        <td id="L378" class="blob-num js-line-number" data-line-number="378"></td>
        <td id="LC378" class="blob-code js-file-line">		<span class="cm">/** Browser detection **/</span></td>
      </tr>
      <tr>
        <td id="L379" class="blob-num js-line-number" data-line-number="379"></td>
        <td id="LC379" class="blob-code js-file-line">		<span class="k">if</span> <span class="p">(</span><span class="nx">options</span><span class="p">.</span><span class="nx">detectBrowser</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L380" class="blob-num js-line-number" data-line-number="380"></td>
        <td id="LC380" class="blob-code js-file-line">			<span class="nx">browser</span> <span class="o">=</span> <span class="nx">Detectizr</span><span class="p">.</span><span class="nx">browser</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L381" class="blob-num js-line-number" data-line-number="381"></td>
        <td id="LC381" class="blob-code js-file-line">			<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">test</span><span class="p">(</span><span class="sr">/opera|webtv/</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/msie\s([\d\w\.]+)/</span><span class="p">)</span> <span class="o">||</span> <span class="nx">is</span><span class="p">(</span><span class="s2">&quot;trident&quot;</span><span class="p">)))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L382" class="blob-num js-line-number" data-line-number="382"></td>
        <td id="LC382" class="blob-code js-file-line">				<span class="nx">browser</span><span class="p">.</span><span class="nx">engine</span> <span class="o">=</span> <span class="s2">&quot;trident&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L383" class="blob-num js-line-number" data-line-number="383"></td>
        <td id="LC383" class="blob-code js-file-line">				<span class="nx">browser</span><span class="p">.</span><span class="nx">name</span> <span class="o">=</span> <span class="s2">&quot;ie&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L384" class="blob-num js-line-number" data-line-number="384"></td>
        <td id="LC384" class="blob-code js-file-line">				<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nb">window</span><span class="p">.</span><span class="nx">addEventListener</span> <span class="o">&amp;&amp;</span> <span class="nb">document</span><span class="p">.</span><span class="nx">documentMode</span> <span class="o">&amp;&amp;</span> <span class="nb">document</span><span class="p">.</span><span class="nx">documentMode</span> <span class="o">===</span> <span class="mi">7</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L385" class="blob-num js-line-number" data-line-number="385"></td>
        <td id="LC385" class="blob-code js-file-line">					<span class="nx">setVersion</span><span class="p">(</span><span class="nx">browser</span><span class="p">,</span> <span class="s2">&quot;8.compat&quot;</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L386" class="blob-num js-line-number" data-line-number="386"></td>
        <td id="LC386" class="blob-code js-file-line">				<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/trident.*rv[ :](\d+)\./</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L387" class="blob-num js-line-number" data-line-number="387"></td>
        <td id="LC387" class="blob-code js-file-line">					<span class="nx">setVersion</span><span class="p">(</span><span class="nx">browser</span><span class="p">,</span> <span class="nb">RegExp</span><span class="p">.</span><span class="nx">$1</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L388" class="blob-num js-line-number" data-line-number="388"></td>
        <td id="LC388" class="blob-code js-file-line">				<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L389" class="blob-num js-line-number" data-line-number="389"></td>
        <td id="LC389" class="blob-code js-file-line">					<span class="nx">setVersion</span><span class="p">(</span><span class="nx">browser</span><span class="p">,</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/trident\/4\.0/</span><span class="p">)</span> <span class="o">?</span> <span class="s2">&quot;8&quot;</span> <span class="o">:</span> <span class="nb">RegExp</span><span class="p">.</span><span class="nx">$1</span><span class="p">));</span></td>
      </tr>
      <tr>
        <td id="L390" class="blob-num js-line-number" data-line-number="390"></td>
        <td id="LC390" class="blob-code js-file-line">				<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L391" class="blob-num js-line-number" data-line-number="391"></td>
        <td id="LC391" class="blob-code js-file-line">			<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;firefox&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L392" class="blob-num js-line-number" data-line-number="392"></td>
        <td id="LC392" class="blob-code js-file-line">				<span class="nx">browser</span><span class="p">.</span><span class="nx">engine</span> <span class="o">=</span> <span class="s2">&quot;gecko&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L393" class="blob-num js-line-number" data-line-number="393"></td>
        <td id="LC393" class="blob-code js-file-line">				<span class="nx">browser</span><span class="p">.</span><span class="nx">name</span> <span class="o">=</span> <span class="s2">&quot;firefox&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L394" class="blob-num js-line-number" data-line-number="394"></td>
        <td id="LC394" class="blob-code js-file-line">				<span class="nx">setVersion</span><span class="p">(</span><span class="nx">browser</span><span class="p">,</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/firefox\/([\d\w\.]+)/</span><span class="p">)</span> <span class="o">?</span> <span class="nb">RegExp</span><span class="p">.</span><span class="nx">$1</span> <span class="o">:</span> <span class="s2">&quot;&quot;</span><span class="p">));</span></td>
      </tr>
      <tr>
        <td id="L395" class="blob-num js-line-number" data-line-number="395"></td>
        <td id="LC395" class="blob-code js-file-line">			<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;gecko/&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L396" class="blob-num js-line-number" data-line-number="396"></td>
        <td id="LC396" class="blob-code js-file-line">				<span class="nx">browser</span><span class="p">.</span><span class="nx">engine</span> <span class="o">=</span> <span class="s2">&quot;gecko&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L397" class="blob-num js-line-number" data-line-number="397"></td>
        <td id="LC397" class="blob-code js-file-line">			<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;opera&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L398" class="blob-num js-line-number" data-line-number="398"></td>
        <td id="LC398" class="blob-code js-file-line">				<span class="nx">browser</span><span class="p">.</span><span class="nx">name</span> <span class="o">=</span> <span class="s2">&quot;opera&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L399" class="blob-num js-line-number" data-line-number="399"></td>
        <td id="LC399" class="blob-code js-file-line">				<span class="nx">browser</span><span class="p">.</span><span class="nx">engine</span> <span class="o">=</span> <span class="s2">&quot;presto&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L400" class="blob-num js-line-number" data-line-number="400"></td>
        <td id="LC400" class="blob-code js-file-line">				<span class="nx">setVersion</span><span class="p">(</span><span class="nx">browser</span><span class="p">,</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/version\/([\d\.]+)/</span><span class="p">)</span> <span class="o">?</span> <span class="nb">RegExp</span><span class="p">.</span><span class="nx">$1</span> <span class="o">:</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/opera(\s|\/)([\d\.]+)/</span><span class="p">)</span> <span class="o">?</span> <span class="nb">RegExp</span><span class="p">.</span><span class="nx">$2</span> <span class="o">:</span> <span class="s2">&quot;&quot;</span><span class="p">)));</span></td>
      </tr>
      <tr>
        <td id="L401" class="blob-num js-line-number" data-line-number="401"></td>
        <td id="LC401" class="blob-code js-file-line">			<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;konqueror&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L402" class="blob-num js-line-number" data-line-number="402"></td>
        <td id="LC402" class="blob-code js-file-line">				<span class="nx">browser</span><span class="p">.</span><span class="nx">name</span> <span class="o">=</span> <span class="s2">&quot;konqueror&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L403" class="blob-num js-line-number" data-line-number="403"></td>
        <td id="LC403" class="blob-code js-file-line">			<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;chrome&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L404" class="blob-num js-line-number" data-line-number="404"></td>
        <td id="LC404" class="blob-code js-file-line">				<span class="nx">browser</span><span class="p">.</span><span class="nx">engine</span> <span class="o">=</span> <span class="s2">&quot;webkit&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L405" class="blob-num js-line-number" data-line-number="405"></td>
        <td id="LC405" class="blob-code js-file-line">				<span class="nx">browser</span><span class="p">.</span><span class="nx">name</span> <span class="o">=</span> <span class="s2">&quot;chrome&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L406" class="blob-num js-line-number" data-line-number="406"></td>
        <td id="LC406" class="blob-code js-file-line">				<span class="nx">setVersion</span><span class="p">(</span><span class="nx">browser</span><span class="p">,</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/chrome\/([\d\.]+)/</span><span class="p">)</span> <span class="o">?</span> <span class="nb">RegExp</span><span class="p">.</span><span class="nx">$1</span> <span class="o">:</span> <span class="s2">&quot;&quot;</span><span class="p">));</span></td>
      </tr>
      <tr>
        <td id="L407" class="blob-num js-line-number" data-line-number="407"></td>
        <td id="LC407" class="blob-code js-file-line">			<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;iron&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L408" class="blob-num js-line-number" data-line-number="408"></td>
        <td id="LC408" class="blob-code js-file-line">				<span class="nx">browser</span><span class="p">.</span><span class="nx">engine</span> <span class="o">=</span> <span class="s2">&quot;webkit&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L409" class="blob-num js-line-number" data-line-number="409"></td>
        <td id="LC409" class="blob-code js-file-line">				<span class="nx">browser</span><span class="p">.</span><span class="nx">name</span> <span class="o">=</span> <span class="s2">&quot;iron&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L410" class="blob-num js-line-number" data-line-number="410"></td>
        <td id="LC410" class="blob-code js-file-line">			<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;crios&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L411" class="blob-num js-line-number" data-line-number="411"></td>
        <td id="LC411" class="blob-code js-file-line">				<span class="nx">browser</span><span class="p">.</span><span class="nx">name</span> <span class="o">=</span> <span class="s2">&quot;chrome&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L412" class="blob-num js-line-number" data-line-number="412"></td>
        <td id="LC412" class="blob-code js-file-line">				<span class="nx">browser</span><span class="p">.</span><span class="nx">engine</span> <span class="o">=</span> <span class="s2">&quot;webkit&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L413" class="blob-num js-line-number" data-line-number="413"></td>
        <td id="LC413" class="blob-code js-file-line">				<span class="nx">setVersion</span><span class="p">(</span><span class="nx">browser</span><span class="p">,</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/crios\/([\d\.]+)/</span><span class="p">)</span> <span class="o">?</span> <span class="nb">RegExp</span><span class="p">.</span><span class="nx">$1</span> <span class="o">:</span> <span class="s2">&quot;&quot;</span><span class="p">));</span></td>
      </tr>
      <tr>
        <td id="L414" class="blob-num js-line-number" data-line-number="414"></td>
        <td id="LC414" class="blob-code js-file-line">			<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;applewebkit/&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L415" class="blob-num js-line-number" data-line-number="415"></td>
        <td id="LC415" class="blob-code js-file-line">				<span class="nx">browser</span><span class="p">.</span><span class="nx">name</span> <span class="o">=</span> <span class="s2">&quot;safari&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L416" class="blob-num js-line-number" data-line-number="416"></td>
        <td id="LC416" class="blob-code js-file-line">				<span class="nx">browser</span><span class="p">.</span><span class="nx">engine</span> <span class="o">=</span> <span class="s2">&quot;webkit&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L417" class="blob-num js-line-number" data-line-number="417"></td>
        <td id="LC417" class="blob-code js-file-line">				<span class="nx">setVersion</span><span class="p">(</span><span class="nx">browser</span><span class="p">,</span> <span class="p">(</span><span class="nx">test</span><span class="p">(</span><span class="sr">/version\/([\d\.]+)/</span><span class="p">)</span> <span class="o">?</span> <span class="nb">RegExp</span><span class="p">.</span><span class="nx">$1</span> <span class="o">:</span> <span class="s2">&quot;&quot;</span><span class="p">));</span></td>
      </tr>
      <tr>
        <td id="L418" class="blob-num js-line-number" data-line-number="418"></td>
        <td id="LC418" class="blob-code js-file-line">			<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">is</span><span class="p">(</span><span class="s2">&quot;mozilla/&quot;</span><span class="p">))</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L419" class="blob-num js-line-number" data-line-number="419"></td>
        <td id="LC419" class="blob-code js-file-line">				<span class="nx">browser</span><span class="p">.</span><span class="nx">engine</span> <span class="o">=</span> <span class="s2">&quot;gecko&quot;</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L420" class="blob-num js-line-number" data-line-number="420"></td>
        <td id="LC420" class="blob-code js-file-line">			<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L421" class="blob-num js-line-number" data-line-number="421"></td>
        <td id="LC421" class="blob-code js-file-line">			<span class="k">if</span> <span class="p">(</span> <span class="o">!!</span><span class="nx">browser</span><span class="p">.</span><span class="nx">name</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L422" class="blob-num js-line-number" data-line-number="422"></td>
        <td id="LC422" class="blob-code js-file-line">				<span class="nx">addConditionalTest</span><span class="p">(</span><span class="nx">browser</span><span class="p">.</span><span class="nx">name</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L423" class="blob-num js-line-number" data-line-number="423"></td>
        <td id="LC423" class="blob-code js-file-line">				<span class="k">if</span> <span class="p">(</span> <span class="o">!!</span><span class="nx">browser</span><span class="p">.</span><span class="nx">major</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L424" class="blob-num js-line-number" data-line-number="424"></td>
        <td id="LC424" class="blob-code js-file-line">					<span class="nx">addVersionTest</span><span class="p">(</span><span class="nx">browser</span><span class="p">.</span><span class="nx">name</span><span class="p">,</span> <span class="nx">browser</span><span class="p">.</span><span class="nx">major</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L425" class="blob-num js-line-number" data-line-number="425"></td>
        <td id="LC425" class="blob-code js-file-line">					<span class="k">if</span> <span class="p">(</span> <span class="o">!!</span><span class="nx">browser</span><span class="p">.</span><span class="nx">minor</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L426" class="blob-num js-line-number" data-line-number="426"></td>
        <td id="LC426" class="blob-code js-file-line">						<span class="nx">addVersionTest</span><span class="p">(</span><span class="nx">browser</span><span class="p">.</span><span class="nx">name</span><span class="p">,</span> <span class="nx">browser</span><span class="p">.</span><span class="nx">major</span><span class="p">,</span> <span class="nx">browser</span><span class="p">.</span><span class="nx">minor</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L427" class="blob-num js-line-number" data-line-number="427"></td>
        <td id="LC427" class="blob-code js-file-line">					<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L428" class="blob-num js-line-number" data-line-number="428"></td>
        <td id="LC428" class="blob-code js-file-line">				<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L429" class="blob-num js-line-number" data-line-number="429"></td>
        <td id="LC429" class="blob-code js-file-line">			<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L430" class="blob-num js-line-number" data-line-number="430"></td>
        <td id="LC430" class="blob-code js-file-line">			<span class="nx">addConditionalTest</span><span class="p">(</span><span class="nx">browser</span><span class="p">.</span><span class="nx">engine</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L431" class="blob-num js-line-number" data-line-number="431"></td>
        <td id="LC431" class="blob-code js-file-line">
</td>
      </tr>
      <tr>
        <td id="L432" class="blob-num js-line-number" data-line-number="432"></td>
        <td id="LC432" class="blob-code js-file-line">			<span class="c1">// Browser Language</span></td>
      </tr>
      <tr>
        <td id="L433" class="blob-num js-line-number" data-line-number="433"></td>
        <td id="LC433" class="blob-code js-file-line">			<span class="nx">browser</span><span class="p">.</span><span class="nx">language</span> <span class="o">=</span> <span class="nx">navigator</span><span class="p">.</span><span class="nx">userLanguage</span> <span class="o">||</span> <span class="nx">navigator</span><span class="p">.</span><span class="nx">language</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L434" class="blob-num js-line-number" data-line-number="434"></td>
        <td id="LC434" class="blob-code js-file-line">			<span class="nx">addConditionalTest</span><span class="p">(</span><span class="nx">browser</span><span class="p">.</span><span class="nx">language</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L435" class="blob-num js-line-number" data-line-number="435"></td>
        <td id="LC435" class="blob-code js-file-line">		<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L436" class="blob-num js-line-number" data-line-number="436"></td>
        <td id="LC436" class="blob-code js-file-line">
</td>
      </tr>
      <tr>
        <td id="L437" class="blob-num js-line-number" data-line-number="437"></td>
        <td id="LC437" class="blob-code js-file-line">		<span class="cm">/** Plugin detection **/</span></td>
      </tr>
      <tr>
        <td id="L438" class="blob-num js-line-number" data-line-number="438"></td>
        <td id="LC438" class="blob-code js-file-line">		<span class="k">if</span> <span class="p">(</span><span class="nx">options</span><span class="p">.</span><span class="nx">detectPlugins</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L439" class="blob-num js-line-number" data-line-number="439"></td>
        <td id="LC439" class="blob-code js-file-line">			<span class="nx">browser</span><span class="p">.</span><span class="nx">plugins</span> <span class="o">=</span> <span class="p">[];</span></td>
      </tr>
      <tr>
        <td id="L440" class="blob-num js-line-number" data-line-number="440"></td>
        <td id="LC440" class="blob-code js-file-line">			<span class="nx">that</span><span class="p">.</span><span class="nx">detectPlugin</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">substrs</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L441" class="blob-num js-line-number" data-line-number="441"></td>
        <td id="LC441" class="blob-code js-file-line">				<span class="kd">var</span> <span class="nx">plugins</span> <span class="o">=</span> <span class="nx">navigator</span><span class="p">.</span><span class="nx">plugins</span><span class="p">,</span></td>
      </tr>
      <tr>
        <td id="L442" class="blob-num js-line-number" data-line-number="442"></td>
        <td id="LC442" class="blob-code js-file-line">					<span class="nx">plugin</span><span class="p">,</span> <span class="nx">haystack</span><span class="p">,</span> <span class="nx">pluginFoundText</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L443" class="blob-num js-line-number" data-line-number="443"></td>
        <td id="LC443" class="blob-code js-file-line">				<span class="k">for</span> <span class="p">(</span><span class="nx">j</span> <span class="o">=</span> <span class="nx">plugins</span><span class="p">.</span><span class="nx">length</span> <span class="o">-</span> <span class="mi">1</span><span class="p">;</span> <span class="nx">j</span> <span class="o">&gt;=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">j</span><span class="o">--</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L444" class="blob-num js-line-number" data-line-number="444"></td>
        <td id="LC444" class="blob-code js-file-line">					<span class="nx">plugin</span> <span class="o">=</span> <span class="nx">plugins</span><span class="p">[</span><span class="nx">j</span><span class="p">];</span></td>
      </tr>
      <tr>
        <td id="L445" class="blob-num js-line-number" data-line-number="445"></td>
        <td id="LC445" class="blob-code js-file-line">					<span class="nx">haystack</span> <span class="o">=</span> <span class="nx">plugin</span><span class="p">.</span><span class="nx">name</span> <span class="o">+</span> <span class="nx">plugin</span><span class="p">.</span><span class="nx">description</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L446" class="blob-num js-line-number" data-line-number="446"></td>
        <td id="LC446" class="blob-code js-file-line">					<span class="nx">pluginFoundText</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L447" class="blob-num js-line-number" data-line-number="447"></td>
        <td id="LC447" class="blob-code js-file-line">					<span class="k">for</span> <span class="p">(</span><span class="nx">k</span> <span class="o">=</span> <span class="nx">substrs</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">k</span> <span class="o">&gt;=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">k</span><span class="o">--</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L448" class="blob-num js-line-number" data-line-number="448"></td>
        <td id="LC448" class="blob-code js-file-line">						<span class="k">if</span> <span class="p">(</span><span class="nx">haystack</span><span class="p">.</span><span class="nx">indexOf</span><span class="p">(</span><span class="nx">substrs</span><span class="p">[</span><span class="nx">k</span><span class="p">])</span> <span class="o">!==</span> <span class="o">-</span><span class="mi">1</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L449" class="blob-num js-line-number" data-line-number="449"></td>
        <td id="LC449" class="blob-code js-file-line">							<span class="nx">pluginFoundText</span> <span class="o">+=</span> <span class="mi">1</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L450" class="blob-num js-line-number" data-line-number="450"></td>
        <td id="LC450" class="blob-code js-file-line">						<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L451" class="blob-num js-line-number" data-line-number="451"></td>
        <td id="LC451" class="blob-code js-file-line">					<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L452" class="blob-num js-line-number" data-line-number="452"></td>
        <td id="LC452" class="blob-code js-file-line">					<span class="k">if</span> <span class="p">(</span><span class="nx">pluginFoundText</span> <span class="o">===</span> <span class="nx">substrs</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L453" class="blob-num js-line-number" data-line-number="453"></td>
        <td id="LC453" class="blob-code js-file-line">						<span class="k">return</span> <span class="kc">true</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L454" class="blob-num js-line-number" data-line-number="454"></td>
        <td id="LC454" class="blob-code js-file-line">					<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L455" class="blob-num js-line-number" data-line-number="455"></td>
        <td id="LC455" class="blob-code js-file-line">				<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L456" class="blob-num js-line-number" data-line-number="456"></td>
        <td id="LC456" class="blob-code js-file-line">				<span class="k">return</span> <span class="kc">false</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L457" class="blob-num js-line-number" data-line-number="457"></td>
        <td id="LC457" class="blob-code js-file-line">			<span class="p">};</span></td>
      </tr>
      <tr>
        <td id="L458" class="blob-num js-line-number" data-line-number="458"></td>
        <td id="LC458" class="blob-code js-file-line">			<span class="nx">that</span><span class="p">.</span><span class="nx">detectObject</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">progIds</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L459" class="blob-num js-line-number" data-line-number="459"></td>
        <td id="LC459" class="blob-code js-file-line">				<span class="k">for</span> <span class="p">(</span><span class="nx">j</span> <span class="o">=</span> <span class="nx">progIds</span><span class="p">.</span><span class="nx">length</span> <span class="o">-</span> <span class="mi">1</span><span class="p">;</span> <span class="nx">j</span> <span class="o">&gt;=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">j</span><span class="o">--</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L460" class="blob-num js-line-number" data-line-number="460"></td>
        <td id="LC460" class="blob-code js-file-line">					<span class="k">try</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L461" class="blob-num js-line-number" data-line-number="461"></td>
        <td id="LC461" class="blob-code js-file-line">						<span class="k">new</span> <span class="nx">ActiveXObject</span><span class="p">(</span><span class="nx">progIds</span><span class="p">[</span><span class="nx">j</span><span class="p">]);</span></td>
      </tr>
      <tr>
        <td id="L462" class="blob-num js-line-number" data-line-number="462"></td>
        <td id="LC462" class="blob-code js-file-line">					<span class="p">}</span> <span class="k">catch</span> <span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L463" class="blob-num js-line-number" data-line-number="463"></td>
        <td id="LC463" class="blob-code js-file-line">						<span class="c1">// Ignore</span></td>
      </tr>
      <tr>
        <td id="L464" class="blob-num js-line-number" data-line-number="464"></td>
        <td id="LC464" class="blob-code js-file-line">					<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L465" class="blob-num js-line-number" data-line-number="465"></td>
        <td id="LC465" class="blob-code js-file-line">				<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L466" class="blob-num js-line-number" data-line-number="466"></td>
        <td id="LC466" class="blob-code js-file-line">				<span class="k">return</span> <span class="kc">false</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L467" class="blob-num js-line-number" data-line-number="467"></td>
        <td id="LC467" class="blob-code js-file-line">			<span class="p">};</span></td>
      </tr>
      <tr>
        <td id="L468" class="blob-num js-line-number" data-line-number="468"></td>
        <td id="LC468" class="blob-code js-file-line">			<span class="k">for</span> <span class="p">(</span><span class="nx">i</span> <span class="o">=</span> <span class="nx">plugins2detect</span><span class="p">.</span><span class="nx">length</span> <span class="o">-</span> <span class="mi">1</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&gt;=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">i</span><span class="o">--</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L469" class="blob-num js-line-number" data-line-number="469"></td>
        <td id="LC469" class="blob-code js-file-line">				<span class="nx">plugin2detect</span> <span class="o">=</span> <span class="nx">plugins2detect</span><span class="p">[</span><span class="nx">i</span><span class="p">];</span></td>
      </tr>
      <tr>
        <td id="L470" class="blob-num js-line-number" data-line-number="470"></td>
        <td id="LC470" class="blob-code js-file-line">				<span class="nx">pluginFound</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L471" class="blob-num js-line-number" data-line-number="471"></td>
        <td id="LC471" class="blob-code js-file-line">				<span class="k">if</span> <span class="p">(</span><span class="nb">window</span><span class="p">.</span><span class="nx">ActiveXObject</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L472" class="blob-num js-line-number" data-line-number="472"></td>
        <td id="LC472" class="blob-code js-file-line">					<span class="nx">pluginFound</span> <span class="o">=</span> <span class="nx">that</span><span class="p">.</span><span class="nx">detectObject</span><span class="p">(</span><span class="nx">plugin2detect</span><span class="p">.</span><span class="nx">progIds</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L473" class="blob-num js-line-number" data-line-number="473"></td>
        <td id="LC473" class="blob-code js-file-line">				<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">navigator</span><span class="p">.</span><span class="nx">plugins</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L474" class="blob-num js-line-number" data-line-number="474"></td>
        <td id="LC474" class="blob-code js-file-line">					<span class="nx">pluginFound</span> <span class="o">=</span> <span class="nx">that</span><span class="p">.</span><span class="nx">detectPlugin</span><span class="p">(</span><span class="nx">plugin2detect</span><span class="p">.</span><span class="nx">substrs</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L475" class="blob-num js-line-number" data-line-number="475"></td>
        <td id="LC475" class="blob-code js-file-line">				<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L476" class="blob-num js-line-number" data-line-number="476"></td>
        <td id="LC476" class="blob-code js-file-line">				<span class="k">if</span> <span class="p">(</span><span class="nx">pluginFound</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L477" class="blob-num js-line-number" data-line-number="477"></td>
        <td id="LC477" class="blob-code js-file-line">					<span class="nx">browser</span><span class="p">.</span><span class="nx">plugins</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">plugin2detect</span><span class="p">.</span><span class="nx">name</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L478" class="blob-num js-line-number" data-line-number="478"></td>
        <td id="LC478" class="blob-code js-file-line">					<span class="nx">addConditionalTest</span><span class="p">(</span><span class="nx">plugin2detect</span><span class="p">.</span><span class="nx">name</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L479" class="blob-num js-line-number" data-line-number="479"></td>
        <td id="LC479" class="blob-code js-file-line">				<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L480" class="blob-num js-line-number" data-line-number="480"></td>
        <td id="LC480" class="blob-code js-file-line">			<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L481" class="blob-num js-line-number" data-line-number="481"></td>
        <td id="LC481" class="blob-code js-file-line">			<span class="k">if</span> <span class="p">(</span><span class="nx">navigator</span><span class="p">.</span><span class="nx">javaEnabled</span><span class="p">())</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L482" class="blob-num js-line-number" data-line-number="482"></td>
        <td id="LC482" class="blob-code js-file-line">				<span class="nx">browser</span><span class="p">.</span><span class="nx">plugins</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="s2">&quot;java&quot;</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L483" class="blob-num js-line-number" data-line-number="483"></td>
        <td id="LC483" class="blob-code js-file-line">				<span class="nx">addConditionalTest</span><span class="p">(</span><span class="s2">&quot;java&quot;</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L484" class="blob-num js-line-number" data-line-number="484"></td>
        <td id="LC484" class="blob-code js-file-line">			<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L485" class="blob-num js-line-number" data-line-number="485"></td>
        <td id="LC485" class="blob-code js-file-line">		<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L486" class="blob-num js-line-number" data-line-number="486"></td>
        <td id="LC486" class="blob-code js-file-line">	<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L487" class="blob-num js-line-number" data-line-number="487"></td>
        <td id="LC487" class="blob-code js-file-line">
</td>
      </tr>
      <tr>
        <td id="L488" class="blob-num js-line-number" data-line-number="488"></td>
        <td id="LC488" class="blob-code js-file-line">	<span class="nx">Detectizr</span><span class="p">.</span><span class="nx">detect</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">settings</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L489" class="blob-num js-line-number" data-line-number="489"></td>
        <td id="LC489" class="blob-code js-file-line">		<span class="k">return</span> <span class="nx">detect</span><span class="p">(</span><span class="nx">settings</span><span class="p">);</span></td>
      </tr>
      <tr>
        <td id="L490" class="blob-num js-line-number" data-line-number="490"></td>
        <td id="LC490" class="blob-code js-file-line">	<span class="p">};</span></td>
      </tr>
      <tr>
        <td id="L491" class="blob-num js-line-number" data-line-number="491"></td>
        <td id="LC491" class="blob-code js-file-line">	<span class="nx">Detectizr</span><span class="p">.</span><span class="nx">init</span> <span class="o">=</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L492" class="blob-num js-line-number" data-line-number="492"></td>
        <td id="LC492" class="blob-code js-file-line">		<span class="k">if</span> <span class="p">(</span><span class="nx">Detectizr</span> <span class="o">!==</span> <span class="kc">undefined</span><span class="p">)</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L493" class="blob-num js-line-number" data-line-number="493"></td>
        <td id="LC493" class="blob-code js-file-line">			<span class="nx">Detectizr</span><span class="p">.</span><span class="nx">browser</span> <span class="o">=</span> <span class="p">{</span></td>
      </tr>
      <tr>
        <td id="L494" class="blob-num js-line-number" data-line-number="494"></td>
        <td id="LC494" class="blob-code js-file-line">				<span class="nx">userAgent</span><span class="o">:</span> <span class="p">(</span><span class="nx">navigator</span><span class="p">.</span><span class="nx">userAgent</span> <span class="o">||</span> <span class="nx">navigator</span><span class="p">.</span><span class="nx">vendor</span> <span class="o">||</span> <span class="nb">window</span><span class="p">.</span><span class="nx">opera</span><span class="p">).</span><span class="nx">toLowerCase</span><span class="p">()</span></td>
      </tr>
      <tr>
        <td id="L495" class="blob-num js-line-number" data-line-number="495"></td>
        <td id="LC495" class="blob-code js-file-line">			<span class="p">};</span></td>
      </tr>
      <tr>
        <td id="L496" class="blob-num js-line-number" data-line-number="496"></td>
        <td id="LC496" class="blob-code js-file-line">			<span class="nx">Detectizr</span><span class="p">.</span><span class="nx">detect</span><span class="p">();</span></td>
      </tr>
      <tr>
        <td id="L497" class="blob-num js-line-number" data-line-number="497"></td>
        <td id="LC497" class="blob-code js-file-line">		<span class="p">}</span></td>
      </tr>
      <tr>
        <td id="L498" class="blob-num js-line-number" data-line-number="498"></td>
        <td id="LC498" class="blob-code js-file-line">	<span class="p">};</span></td>
      </tr>
      <tr>
        <td id="L499" class="blob-num js-line-number" data-line-number="499"></td>
        <td id="LC499" class="blob-code js-file-line">	<span class="nx">Detectizr</span><span class="p">.</span><span class="nx">init</span><span class="p">();</span></td>
      </tr>
      <tr>
        <td id="L500" class="blob-num js-line-number" data-line-number="500"></td>
        <td id="LC500" class="blob-code js-file-line">
</td>
      </tr>
      <tr>
        <td id="L501" class="blob-num js-line-number" data-line-number="501"></td>
        <td id="LC501" class="blob-code js-file-line">	<span class="k">return</span> <span class="nx">Detectizr</span><span class="p">;</span></td>
      </tr>
      <tr>
        <td id="L502" class="blob-num js-line-number" data-line-number="502"></td>
        <td id="LC502" class="blob-code js-file-line"><span class="p">}(</span><span class="k">this</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">navigator</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nb">document</span><span class="p">));</span></td>
      </tr>
</table>

  </div>

  </div>
</div>

<a href="#jump-to-line" rel="facebox[.linejump]" data-hotkey="l" style="display:none">Jump to Line</a>
<div id="jump-to-line" style="display:none">
  <form accept-charset="UTF-8" class="js-jump-to-line-form">
    <input class="linejump-input js-jump-to-line-field" type="text" placeholder="Jump to line&hellip;" autofocus>
    <button type="submit" class="button">Go</button>
  </form>
</div>

        </div>

      </div><!-- /.repo-container -->
      <div class="modal-backdrop"></div>
    </div><!-- /.container -->
  </div><!-- /.site -->


    </div><!-- /.wrapper -->

      <div class="container">
  <div class="site-footer">
    <ul class="site-footer-links right">
      <li><a href="https://status.github.com/">Status</a></li>
      <li><a href="http://developer.github.com">API</a></li>
      <li><a href="http://training.github.com">Training</a></li>
      <li><a href="http://shop.github.com">Shop</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/about">About</a></li>

    </ul>

    <a href="/" aria-label="Homepage">
      <span class="mega-octicon octicon-mark-github" title="GitHub"></span>
    </a>

    <ul class="site-footer-links">
      <li>&copy; 2014 <span title="0.04784s from github-fe130-cp1-prd.iad.github.net">GitHub</span>, Inc.</li>
        <li><a href="/site/terms">Terms</a></li>
        <li><a href="/site/privacy">Privacy</a></li>
        <li><a href="/security">Security</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
  </div><!-- /.site-footer -->
</div><!-- /.container -->


    <div class="fullscreen-overlay js-fullscreen-overlay" id="fullscreen_overlay">
  <div class="fullscreen-container js-suggester-container">
    <div class="textarea-wrap">
      <textarea name="fullscreen-contents" id="fullscreen-contents" class="fullscreen-contents js-fullscreen-contents js-suggester-field" placeholder=""></textarea>
    </div>
  </div>
  <div class="fullscreen-sidebar">
    <a href="#" class="exit-fullscreen js-exit-fullscreen tooltipped tooltipped-w" aria-label="Exit Zen Mode">
      <span class="mega-octicon octicon-screen-normal"></span>
    </a>
    <a href="#" class="theme-switcher js-theme-switcher tooltipped tooltipped-w"
      aria-label="Switch themes">
      <span class="octicon octicon-color-mode"></span>
    </a>
  </div>
</div>



    <div id="ajax-error-message" class="flash flash-error">
      <span class="octicon octicon-alert"></span>
      <a href="#" class="octicon octicon-x close js-ajax-error-dismiss" aria-label="Dismiss error"></a>
      Something went wrong with that request. Please try again.
    </div>


      <script crossorigin="anonymous" src="https://assets-cdn.github.com/assets/frameworks-bc28a4f6b05fd6cd91bbc92310bbbc53e54c6ec2.js" type="text/javascript"></script>
      <script async="async" crossorigin="anonymous" src="https://assets-cdn.github.com/assets/github-1d4c97a5d7662f40cd45545e25f18281f5b6ef5c.js" type="text/javascript"></script>
      
      
        <script async src="https://www.google-analytics.com/analytics.js"></script>
  </body>
</html>

