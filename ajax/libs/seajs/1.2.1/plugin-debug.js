/**
 * The map plugin for auto responder
 */
define('seajs/plugin-debug', [], function() {

  var util = seajs.pluginSDK.util
  var loc = this.location
  var search = loc.search
  var config = getConfig()


  // Forces debug to true when url contains `?seajs-debug`
  if (search.indexOf('seajs-debug') > -1) {
    config.debug = 1
    config.console = 1
    saveConfig(config)
  }

  // Loads the map file
  if (config.mapfile) {
    document.title = '[seajs debug mode] - ' + document.title

    // Adds the `mapfile` to preload config
    seajs.config({
      preload: config.mapfile
    })
  }


  // Restores the use function
  seajs.use = seajs._use
  delete seajs._use

  // Calls pre-called `seajs.use`
  var args = seajs._useArgs
  if (args) {
    for (var i = 0; i < args.length; i++) {
      seajs.use(args[i][0], args[i][1])
    }
    delete seajs._useArgs
  }


  // Shows console
  if (config.console) {
    showConsole(config.mapfile)
  }


  // Loads firebug-lite
  if (search.indexOf('firebug-lite') > -1) {
    util.fetch('https://getfirebug.com/firebug-lite.js')
  }


  // Helpers
  // -------

  function showConsole(mapfile) {
    var style =
        '#seajs-debug-console { ' +
        '  position: fixed; bottom: 10px; ' +
        '  *position: absolute; *top: 10px; *width: 465px; ' +
        '  right: 10px; z-index: 999999999;' +
        '  background: #fff; color: #000; font: 12px arial;' +
        '  border: 2px solid #000; padding: 0 10px 10px;' +
        '}' +
        '#seajs-debug-console h3 {' +
        '  margin: 3px 0 6px -6px; padding: 0;' +
        '  font-weight: bold; font-size: 14px;' +
        '}' +
        '#seajs-debug-console input {' +
        '  width: 400px; margin-left: 10px;' +
        '}' +
        '#seajs-debug-console button {' +
        '  float: right; margin: 6px 0 0 10px;' +
        '  box-shadow: #ddd 0 1px 2px;' +
        '  font-size: 14px; padding: 4px 10px;' +
        '  color: #211922; background: #f9f9f9;' +
        '  text-shadow: 0 1px #eaeaea;' +
        '  border: 1px solid #bbb; border-radius: 3px;' +
        '  cursor: pointer; opacity: .8' +
        '}' +
        '#seajs-debug-console button:hover {' +
        '  background: #e8e8e8; text-shadow: none; opacity: 1' +
        '}' +
        '#seajs-debug-console a {' +
        '  position: relative; top: 10px; text-decoration: none;' +
        '}'

    var html =
        '<div id="seajs-debug-console">' +
        '  <h3>SeaJS Debug Console</h3>' +
        '  <label>Map file: <input value="' + mapfile + '"/></label><br/>' +
        '  <button>Exit</button>' +
        '  <button>Hide</button>' +
        '  <button>Refresh</button>' +
        '</div>'

    var div = document.createElement('div')
    div.innerHTML = html

    seajs.importStyle(style)
    appendToBody(div)

    var buttons = div.getElementsByTagName('button')

    // hide
    buttons[1].onclick = function() {
      config.console = 0
      saveConfig(config)
      loc.replace(loc.href.replace('seajs-debug', ''))
    }

    // refresh
    buttons[2].onclick = function() {
      var link = div.getElementsByTagName('input')[0].value || ''
      if (link) {
        link = util.id2Uri(link)
      }

      config.mapfile = link
      saveConfig(config)
      loc.reload()
    }

    // exit debug mode
    buttons[0].onclick = function() {
      config.debug = 0
      saveConfig(config)
      loc.replace(loc.href.replace('seajs-debug', ''))
    }
  }

  function getConfig() {
    var cookie = '', m

    if ((m = document.cookie.match(
        /(?:^| )seajs-debug(?:(?:=([^;]*))|;|$)/))) {
      cookie = m[1] ? decodeURIComponent(m[1]) : ''
    }

    var parts = cookie.split('`')
    return {
      debug: Number(parts[0]) || 0,
      mapfile: parts[1] || '',
      console: Number(parts[2]) || 0
    }
  }

  function saveConfig(o) {
    var date = new Date()
    date.setTime(date.getTime() + 30 * 86400000) // 30 days

    document.cookie = 'seajs-debug=' + o.debug + '`' + o.mapfile + '`' +
        o.console + '; path=/; expires=' + date.toUTCString()
  }


  var MAX_TRY = 100
  var pollCount = 0

  function appendToBody(div) {
    pollCount++

    if (document.body) {
      document.body.appendChild(div)
    }
    else if (pollCount < MAX_TRY) {
      setTimeout(function() {
        appendToBody(div)
      }, 200)
    }
  }

});

