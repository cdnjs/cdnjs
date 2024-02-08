<p align="center">
<img width="250" src="https://bmsvieira.github.io/moovie.js/demo-template/images/moovie_black.png">
</p>

---

<p align="center" size="20pt"><font size="20pt"><b><a href="https://github.com/BMSVieira/moovie.js#%EF%B8%8F-demo">Demo</a></b>  ▪️  <b><a href="https://github.com/BMSVieira/moovie.js#%EF%B8%8F-installation-browser">Installation</a></b>   ▪️  <b><a href="https://github.com/BMSVieira/moovie.js#%EF%B8%8F-shortcuts">Shortcuts</a></b>  ▪️  <b><a href="https://github.com/BMSVieira/moovie.js#%EF%B8%8F-api--methods">API</a></b>  ▪️ <b><a href="https://github.com/BMSVieira/moovie.js#%EF%B8%8F-integrations">Integrations</a></b>  ▪️  <b><a href="https://github.com/BMSVieira/moovie.js#%EF%B8%8F-events">Events</a></b>  <br> <b><a href="https://github.com/BMSVieira/moovie.js#%EF%B8%8F-styling">Styling</a></b>  ▪️  <b><a href="https://github.com/BMSVieira/moovie.js#%EF%B8%8F-plugins">Plugins</a></b></font> ▪️ <b><a href="https://github.com/BMSVieira/moovie.js#%EF%B8%8F-custom-events">Custom Events</a></b></font> ▪️ <b><a href="https://github.com/BMSVieira/moovie.js#%EF%B8%8F-i18n-support">i18n</a></b></font> ▪️ <b><a href="https://github.com/BMSVieira/moovie.js#%EF%B8%8F-settings">Settings</a></b></font></p>

---

◼️ Features:
-
- 🔧 Fully customizable and Easy-to-use
- 💎 Built-in `caption offset adjust` on the fly
- 🎬 Built-in support for `.vtt` and `.srt` caption files 
- 🕹 Built-in `Plugins`, use the code that you really need!
- 🎯 Built-in `CustomEvents`, add multiple events that will run a specific currentTime
- 🖊 Add tracks/captions `dynamically` using our API
- 🗃 Add tracks/captions `locally` on the fly (no server or upload required) 
- 🌠 Adjust speed on the fly
- 🛠 Standardized events / shortcuts / API
- 🖌 Caption customization
- 💪 No dependencies, built with VanillaJS
- 🌎 Tested in all modern browsers
- 💻 Responsive
- 🗃 Integration with `webtorrent.js`, `dash.js`, `Shaka Player` and `hls.js`
- 🌎 Internationalization (i18n) of controls

◼️ Demo:
-
https://mooviejs.com/

◼️ Installation (Browser):
-

<b>1 - Include JavaScript Source.</b>
```javascript
<script src="path/to/moovie.js"></script>
```
<b>2 - Include Styles.</b>
```javascript
<link rel="stylesheet" href="path/to/moovie.css">
```
<b>3 - Set HTML.</b>
```html
<video id="example" poster="<<path-to-poster>>">
  <source src="<<path-to-file.mp4>>" type="video/mp4">
  <track kind="captions" label="Portuguese" srclang="pt" src="<<path-to-caption.vtt>>">
  <track kind="captions" label="English" srclang="en" src="<<path-to-caption.vtt>>">
  Your browser does not support the video tag.
</video>
```
<b>4 - Initilize.</b>
```javascript
document.addEventListener("DOMContentLoaded", function() {
   var demo = new Moovie({
     selector: "#example",
     dimensions: {
          width: "100%"
     }
   });
});
```
###### Note: Do not forget to include "icons" folder.

◼️ Installation (NPM):
-
<b>1 - Install npm package</b>
```javascript
npm i mooviejs
```
<b>2 - Include Styles.</b>
```javascript
<link rel="stylesheet" href="path/to/moovie.css">
```
<b>3 - Set HTML.</b>
```html
<video id="example" poster="<<path-to-poster>>">
  <source src="<<path-to-file.mp4>>" type="video/mp4">
  <track kind="captions" label="Portuguese" srclang="pt" src="<<path-to-caption.vtt>>">
  <track kind="captions" label="English" srclang="en" src="<<path-to-caption.vtt>>">
  Your browser does not support the video tag.
</video>
```
<b>4 - Initilize.</b>
```javascript
const Moovie = require('mooviejs');
var demo = new Moovie({
     selector: "#example",
     dimensions: {
          width: "100%"
     },
     icons: {
        path: "<path/to/icons/folder>"
     }
});
```

◼️ CDN:
-
You can use our CDN (provided by JSDelivr) for the JavaScript and CSS files.

```html
// Javascript
<script src="https://cdn.jsdelivr.net/gh/BMSVieira/moovie.js@latest/js/moovie.min.js"></script>

// CSS
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/BMSVieira/moovie.js@latest/css/moovie.min.css">
```

◼️ Captions:
-
Currently it has full support for `WebVTT(.vtt)` and `SubRip(.srt)`.
<br>
### ▪️ Dynamically (Public server required)
Use the standard html as the example below (source must be in a public server with cross-origin headers).

```html
<video>
  <track kind="captions" label="<<Language>>" srclang="<<SourceLang>>" src="<<path-to-caption.vtt/.srt>>">
</video
```
### ▪️ Locally (No server or upload required)
Since browsers won't let you display subtitles loaded locally, you can use moovie's built-in feature that allows you to add local subtitles without a server or any kind of upload.<br>

When loading caption files locally, be sure to save the file with UTF-8 encoding, otherwise you will encounter some decryption errors like "�" <br>

```html
Video Player ➔ ⚙️ ➔ Captions ➔ Load Locally
```
⚠️ This method <b>DOES NOT</b> load anything into server/folder/directory.


◼️ Caption Offset Adjust:
-

It is possible to adjust the offset by a total of `10 seconds` (-5 / +5) on the fly.<br><br>
<img width="500" src="https://bmsvieira.github.io/moovie.js/demo-template/images/captionoffset.png">

◼️ Shortcuts:
-

A player will bind the following keyboard shortcuts when it has focus.

| Key | Description |
| --- | --- |
| `SpaceBar` | Toggle Play|
| `K`  | Toggle Play  |
| `F` | Toggle Fullscreen|
| `C` | Toggle Captions|
| `M`  | Toggle Mute  |
| `ArrowRight`  | Forward `5s`  |
| `ArrowLeft` | Backward `5s` |
| `Shift`+`W`| Increase caption's size|
| `Shift`+`S`| Decrease caption's size|

◼️ API > Methods:
-

<b>togglePlay:</b>
Play/Pause video

```javascript
demo.togglePlay();
```

<b>toggleSubtitles:</b>
Enable/Disable subtitles

```javascript
demo.toggleSubtitles();
```

<b>toggleFullscreen:</b>
Enable/Disable fullscreen

```javascript
demo.toggleFullscreen();
```

<b>destroy:</b>
Remove current player and unbinds all its events

```javascript
demo.destroy();
```

<b>build:</b>
Build a new player

```javascript
demo.build();
```

<b>addTrack:</b>
Add multiple/single captions to player

| Name | Type | Default | Description |
| --- | --- |--- | --- |
| `label` | `string` | `New Subtitle` | Name of the new subtitle in the caption box |
| `srclang` | `string` | `New` | Country designation |
| `src` | `string` | `---` |  Path to the file <b>[Can not be empty]</b> |

```javascript
demo.addTrack({
  options : {
        0: {
            label: 'Italian',
            srclang: "it",
            src: "<<path-to-file.vtt/.srt"
        },
        1: {
            label: 'Spanish',
            srclang: "es",
            src: "<<path-to-file.vtt/.srt"
        }
    },
    onComplete: function(){
      console.log("Completed!");
    } 
});
```

<b>change:</b>
Apply changes to current player.

| Name | Type | Description |
| --- | --- | --- |
| `video` > `videoSrc` | `string` | New video's source|
| `video` > `posterSrc` | `string` | New poster's source |
| `captions` > `clearCaptions` | `boolean` |  Remove all available captions in the menu |

```javascript
demo.change({
     video: {
         videoSrc: "<<path-to-video>>",
         posterSrc: "<<path-to-poster>>"
     },
     captions:{
         clearCaptions: true
     },
    onComplete: function(){
      console.log("Completed!");
    } 
});
```

◼️ API > Gets:
-
```javascript
// Returns player DOM element
demo.playerElement

// Returns a boolean indicating if the current player is playing.
demo.playing

// Returns a boolean indicating if the current player is paused.
demo.paused

// Returns a boolean indicating if the current player is stopped.
demo.stopped  

// Returns a boolean indicating if the current player has finished playback.
demo.ended    

// Returns currentTime of the player. 
demo.currentTime

// Returns the duration for the current media.
demo.duration

// Returns a boolean indicating if the current player is seeking.
demo.seeking

// Returns the volume of the player.
demo.volume

// Returns a boolean indicating if the current player is muted.
demo.muted

// Returns current playRate 
demo.speed

// Returns mininum speed allowed
demo.minimumSpeed

// Returns maximum speed allowed
demo.maximumSpeed

// Returns mininum caption offset allowed
demo.minimumOffset

// Returns maximum caption offset allowed
demo.maximumOffset

// Returns current caption offset
demo.captionOffset

// Returns current source of the player
demo.source
```

◼️ API > Sets:
-
```javascript
// Set currentTime to given number(seconds)
demo.currentTime = 60

// Set player's volume to given number (0.5 is half the volume)
demo.volume = 0.5

// Set player's playbackRate to given number (0.1 to 8)
demo.speed = 2

// Set player's caption offset to given number (-5 to 5)
demo.captionOffset = 2

// Mute or Unmute player (boolean)
demo.muted = true
```

◼️ Integrations:
-
|  | Name & Info | Example |
| :-:  | :-: | --- |
|<img width="35" src="https://upload.wikimedia.org/wikipedia/en/thumb/7/79/WebTorrent_logo.png/220px-WebTorrent_logo.png">| `WebTorrent`<br> For more info read <a href="https://webtorrent.io/intro" target="_blank">WebTorrent</a> documentation.<br> | [Codepen](https://codepen.io/BMSVieira/pen/vYgpvJX)|
|<img width="120" src="https://www.digitalprimates.net/wp-content/uploads/2020/04/logo-dashjs.png">| `dash.js`<br>For more info read <a href="https://reference.dashif.org/dash.js/latest/samples/index.html" target="_blank">dash.js</a> documentation. | [Codepen](https://codepen.io/BMSVieira/pen/BapJqBV)|
|<img width="80" src="https://raw.githubusercontent.com/google/shaka-player/master/docs/shaka-player-logo.png">| `Shaka Player`<br> For more info read <a href="https://github.com/google/shaka-player" target="_blank">Shaka Player</a> documentation. | [Codepen](https://codepen.io/BMSVieira/pen/PoWEVwe)|
|<img width="80" src="https://cloud.githubusercontent.com/assets/616833/19739063/e10be95a-9bb9-11e6-8100-2896f8500138.png">| `hls.js`<br> For more info read <a href="https://github.com/video-dev/hls.js/" target="_blank">hls.js</a> documentation. | [Codepen](https://codepen.io/BMSVieira/pen/ExZorLW)|

◼️ Events:
-

Using <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events" target="_blank">Standard Media Events</a> you can listen for events on the target element you setup. check the example below:

```javascript
demo.video.addEventListener("canplay", (event) => {
   console.log(event);
});
```

| Event | Description 
| --- | --- |
| `abort`| Sent when playback is aborted; for example, if the media is playing and is restarted from the beginning, this event is sent. |
| `canplay`| Sent when enough data is available that the media can be played, at least for a couple of frames. |
| `canplaythrough`| Sent when the readyState changes to HAVE_ENOUGH_DATA, indicating that the entire media can be played without interruption, assuming the download rate remains at least at the current level.|
| `durationchange`| The metadata has loaded or changed, indicating a change in duration of the media. |
| `emptied`| The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the load() method is called to reload it. |
| `error`| Sent when an error occurs.  The element's error attribute contains more information. |
| `interruptbegin`| Sent when audio playing on a Firefox OS device is interrupted, either because the app playing the audio is sent to the background, or audio in a higher priority audio channel begins to play. |
| `interruptend`| Sent when previously interrupted audio on a Firefox OS device commences playing again — when the interruption ends. |
| `loadeddata`| The first frame of the media has finished loading. |
| `loadedmetadata`| The media's metadata has finished loading; all attributes now contain as much useful information as they're going to. |
| `loadstart`| Sent when loading of the media begins. |
| `pause`| Sent when the playback state is changed to paused (paused property is true). |
| `play`| Sent when the playback state is no longer paused, as a result of the play method, or the autoplay attribute. |
| `playing`| Sent when the media has enough data to start playing, after the play event, but also when recovering from being stalled, when looping media restarts, and after seeked, if it was playing before seeking. |
| `progress`| Sent periodically to inform interested parties of progress downloading the media. Information about the current amount of the media that has been downloaded is available in the media element's buffered attribute. |
| `ratechange`| Sent when the playback speed changes. |
| `seeked`| Sent when a seek operation completes. |
| `seeking`| Sent when a seek operation begins. |
| `stalled`| Sent when the user agent is trying to fetch media data, but data is unexpectedly not forthcoming. |
| `suspend`| Sent when loading of the media is suspended; this may happen either because the download has completed or because it has been paused for any other reason. |
| `timeupdate`| The time indicated by the element's currentTime attribute has changed. |
| `volumechange`| Sent when the audio volume changes (both when the volume is set and when the muted attribute is changed). |
| `waiting`| Sent when the requested operation (such as playback) is delayed pending the completion of another operation (such as a seek). |
| `captionchange` | Sent when subtitles are changed |
| `offsetchange`| Sent when subtitles's offset has changed  |
| `togglecaption`| Sent when subtitles's state is changed |

◼️ Styling > Colors:
-

Using <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties" target="_blank">CSS Custom Properties</a> you can easily customize your own player. 
<br>Check below a list of variables and what they are used for:

| Name | Description | Default |
| --- | --- | --- |
| `--moovie_main_color` | Moovie main color  | <img width="20px" src="https://mooviehosted.000webhostapp.com/color/maincolor.png"> `#3191f7`|
| `--moovie_bg_controls` | Background color when hover the buttons | `rgba(16, 34, 62, 0.6)`|
| `--moovie_bg_submenu` | Submenu background color  | <img width="20px" src="https://mooviehosted.000webhostapp.com/color/submenu.png"> `#f7f7f7`|
| `--moovie_bg_cuetimer` | Cuetimer background color  | <img width="20px" src="https://mooviehosted.000webhostapp.com/color/submenotext.png"> `#2b2b2b`|
| `--moovie_submenu_options_fcolor`| Submenu text color  | <img width="20px" src="https://mooviehosted.000webhostapp.com/color/submenotext.png"> `#515151`|
| `--moovie_topic_submenu_fcolor` | Submenu topic text color  | <img width="20px" src="https://mooviehosted.000webhostapp.com/color/topiccolor.png"> `#797979`|
| `--moovie_currenttime_color` | CurrentTime text color | `white`|
| `--moovie_submenu_options_fsize` | Submenu options font size  | `10pt`|
| `--moovie_topic_submenu_fsize` | Submenu topic font size  | `9pt`|
| `--moovie_currenttime_fsize`| CurrentTime font size  | `11pt`|
| `--moovie_cuetimer_fsize`| Cuetimer font size  | `9pt`|
| `--moovie_svgicons_width` | Icons size  | `15px`|
| `--moovie_padding_controls`| Control bar padding  | `13px`|
| `--moovie_caption_fcolor`| Captions text color  | `white`|
| `--moovie_cuetimer_fcolor`| Cuetimer text color  | `white`|

◼️ Styling > Icons:
-
moovie uses `.svg` icons that are stored in the `icons` folder that is located by default in the root, however, you can specify a new location in the config options.

```javascript
config: {
    icons: {
        path: "./path/to/folder/"
    }
}
```
Folder structure:
```html
moovie/
├── icons/
│   ├── back.svg
│   ├── caption.svg
│   ├── cc.svg
│   ├── cog.svg
│   ├── fullscreen.svg
│   ├── mute.svg
│   ├── next.svg
│   ├── pause.svg
│   ├── play.svg
│   ├── volume.svg
|
├── css/
│   ├── moovie.css
|
├── js/
│   ├── moovie.js
```

◼️ Plugins:
-
There are external plugins you can use to add extra features.
<br>to call a plugin, follow the example below:

```html
<!-- Include plugin path after moovie.js -->
<script src="path/to/plugin.js"></script>
```
by default, plugins are located in the `./js/plugins/` folder, but you can specify a new location.<br>

```javascript
// Initialize Moovie
var demo = new Moovie({selector: "#example"});

// Call External Plugin (Playlist example)
var PlaylistPlugin = new _Moovie_Playlist({reference: demo});
```

List of available plugins:

| Name | Description |  |
| --- | --- | --- |
| `_Moovie_Playlist` | Create a playlist of videos| [More info](https://github.com/BMSVieira/moovie.js/tree/main/js/plugins/playlist)|

◼️ Custom Events:
-
You can add multiple events that will run at a specific currentTime, for example:

```javascript
var demo = new Moovie({
  selector: "#example",
  customEvents: [
    {
      type: "skip",
      to: "56",
      starttime: "10",
      endtime: "20",
      content: "Skip Intro",
      position: "bottom-left",
      class: "my_class"
    },
    {
    ...
    }
  ]
});
```

| Option | Parameters | Description |
| --- | --- | --- |
| `type` | `skip`, `redirect`, `function` | Type of event. `skip`: skip video to given seconds, `redirect`: same behavior of a link, `function`: call a function that runs itself|
| `to` | `int`, `string`, `function(){ }` | Parameters that will be executed|
| `starttime` | `int`| Time the button appears  (seconds)|
| `endtime` | `int`| Time when the button will be removed (seconds)|
| `content` | `string`| Button's content, can be used `plain text` or `HTML`|
| `position` | `top-left`, `bottom-left`, `top-center`, `bottom-center`, `top-right`, `bottom-right` | Button's position|
| `class` | `string` | Custom class|


◼️ i18n Support:
-
You can translate the player to any language you want in the configurations.

```javascript
config: {
    i18n : {
          play : "(Play:Pause)",
          mute : "(Mute:Unmute)",
          subtitles : "(Enable:Disable) Subtitles",
          ...
      }
}
```

How translation works is very simple, all text between brackets are the "changing" parts of the string, and in the left side of the ":" is the default state string.

```javascript
([DEFAULT STATE]:[AFTER ACTION STATE]) [CONTINUES STRING]
```
Working examples:

```javascript
// English
subtitles : "(Enable:Disable) Subtitles",
// Portuguese
subtitles : "(Ativar:Desativar) Legendas",
// French
subtitles: "(Activer:Désactiver) Les sous-titres"
```

| Option | Default | Description |
| --- | :-: | --- |
| `play` | `(Play:Pause)` | Play button |
| `mute` | `(Mutar:Desmutar)` | Mute button |
| `subtitles` | `(Enable:Disable) Subtitles` | Subtitles button |
| `config` | `Settings` | Settings button |
| `fullscreen` | `(Enter:Exit) Fullscreen` | Fullscreen button |
| `main_topic` | `settings:` | Submenu's topic |
| `main_caption` | `Captions` | Submenu's caption string |
| `main_offset` | `Caption Offset` | Submenu's offset string |
| `main_speed` | `Speed` |Submenu's speed string |
| `main_disabled` | `Disabled` | Submenu's caption state |
| `main_default` | `Default` | Submenu's speed default state |
| `caption_topic` | `Captions:` | Caption's submenu topic string |
| `caption_back` | `Back` | Caption's submenu back button |
| `caption_load` | `Load Locally` | Caption's submenu load subtitles string |
| `offset_topic` | `Adjust Caption Offset` | Offset's submenu topic string |
| `speed_topic` | `Speed Adjust` | Speed's submenu topic string |

◼️ Settings:
-
| Option | Type | Description |
| --- | --- | --- |
| `selector` | `String`  | Specify ID of the element|
| ◼️ <b>`dimensions` > </b>|  |  |
| `width` | `string` | Width of the player (you must specify the type: `px`, `%`, etc..) |
| ◼️ <b>`config > storage` > </b>|  |  |
| `captionOffset`| `boolean`  | Indicates whether caption's offset adjust will be stored or not|
| `playrateSpeed`| `boolean`  | Indicates whether Play Speed will be stored or not|
| `captionSize`| `boolean`  | Indicates whether caption's size will be stored or not|
| ◼️ <b>`config > controls` > </b>|  |  |
| `playtime`| `boolean` | Indicates whether current duration will be displayed or not |
| `mute`| `boolean` | Indicates whether mute button will be displayed or not |
| `volume`| `boolean` | Indicates whether volume button will be displayed or not  |
| `subtitles`| `boolean` | Indicates whether subtitles button will be displayed or not  |
| `config`| `boolean` | Indicates whether config button will be displayed or not  |
| `fullscreen`| `boolean` | Indicates whether fullscreen button will be displayed or not  |
| `submenuCaptions`| `boolean` | Indicates whether captions submenu button will be displayed or not |
| `submenuOffset`| `boolean` | Indicates whether offset adjust submenu button will be displayed or not |
| `submenuSpeed`| `boolean` | Indicates whether speed adjust submenu button will be displayed or not |
| `allowLocalSubtitles`| `boolean` | Indicates whether local subtitles is allowed or not |
| ◼️ <b>`icons >`</b>|  |  |
| `path`| `string`  | Specify icons folder location |


<b>Full Example:</b>

```javascript
document.addEventListener("DOMContentLoaded", function() {
  var demo = new Moovie({
    selector: "#example",
    dimensions: {
         width: "100%"
    },
    config: {
        storage: {
           captionOffset: false,
           playrateSpeed: false,
           captionSize: false
        },
        controls : {
            playtime : true,
            mute : true,
            volume : true,
            subtitles : true,
            config : true,
            fullscreen : true,
            submenuCaptions : true,
            submenuOffset : true,
            submenuSpeed : true,
            allowLocalSubtitles : true  
        },
        i18n : {
            play : "(Play:Pause)",
            mute : "(Mute:Unmute)",
            subtitles : "(Enable:Disable) Subtitles",
            config : "Settings",
            fullscreen : "(Enter:Exit) Fullscreen",
            main_topic: "settings:",
            main_caption: "Captions",
            main_offset: "Caption Offset",
            main_speed: "Speed",
            main_disabled: "Disabled",
            main_default: "Default",
            caption_topic: "Captions:",
            caption_back: "Back",
            caption_load: "Load Locally",
            offset_topic: "Adjust Caption Offset",
            speed_topic: "Speed Adjust"
         }
    },
    icons: {
        path: "./path/to/folder/"
    }
  });
});
```

◼️ Sponsors:
-
<img width="65" src="https://mooviejs.com/images/jetbrains.png">

Thanks to <b>JetBrains</b> for supporting this project with its incredible tools!
