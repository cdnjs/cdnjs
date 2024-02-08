<p align="center">
<img width="250" src="https://bmsvieira.github.io/moovie.js/demo-template/images/moovie_black.png">
</p>

◼️ Playlist v1.0.0:
-
by default, plugins are located in the `./js/plugins/` folder, but you can specify a new location.<br>

```html
<!-- Include plugin path after moovie.js -->
<script src="path/to/plugin.js"></script>
```
```javascript
// Initialize Moovie
var demo = new Moovie({selector: "#example"});

// Call External Plugin
var PlaylistPlugin = new _Moovie_Playlist({
  reference: demo, // variable that initializated moovie
  sources: [
      {
        src: "<<source-to-video>>",
        title: "Playlist Video 1"
      },
      {
        src: "<<source-to-video>>",
        title: "Playlist Video 2"
      },
      {
        src: "<<source-to-video>>",
        title: "Playlist Video 3"
      }
  ]
});
```
