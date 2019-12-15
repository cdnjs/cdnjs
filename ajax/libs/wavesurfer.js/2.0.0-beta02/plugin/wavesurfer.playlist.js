(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["wavesurfer"], function (a0) {
      return (factory(a0));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("wavesurfer.js"));
  } else {
    factory(WaveSurfer);
  }
}(this, function (WaveSurfer) {

'use strict';

/* Playlist Plugin */
WaveSurfer.Playlist = {
    init: function (params) {
        this.params = params;

        var wavesurfer = this.wavesurfer = params.wavesurfer;

        if (!this.wavesurfer) {
            throw new Error('No WaveSurfer instance provided');
        }

        // parse playlist and set params
        this.playlistFileGET = this.params.playlistFile || null;
        this.playlistType = this.params.playlistType || 'm3u';
        this.playlistData = [];

        if (this.playlistFileGET != null) {
            var ajaxData = wavesurfer.util.ajax({
                url: this.playlistFileGET,
                responseType: 'text'
            });

            var _this = this;
            ajaxData.on('success', function (data, e) {
                _this.loadPlaylist(data);
                _this.wavesurfer.fireEvent('playlist-ready');
            });
            ajaxData.on('error', function (e) {
                throw new Error('Error reading the playlist file' + 'XHR error: ' + e.target.statusText);
            });

        } else {
            throw new Error('No playlist file provided');
        }
    },

    getPlaylist: function() {
        return this.playlistData;
    },

    loadPlaylist: function(playlistFile) {
        // check if playlist type is given
        var playlist = [];

        if (this.playlistType == 'm3u' || this.playlistType == 'audio/mpegurl') {
            playlist = playlistFile.replace(/^.*#.*$|#EXTM3U|#EXTINF:/mg, '').split('\n');
        } else {
            throw new Error('No valid playlist file provided');
        }

        // playlist type is set return the playlist
        var outputArray = [];
        for (var i = 0; i < playlist.length; i++) {
            if (playlist[i]) {
                // check if file name has .mp3 or .wav before adding the playlist array
                if(playlist[i].indexOf('.mp3') !== -1 || playlist[i].indexOf('.wav') !== -1) {
                    outputArray.push(playlist[i].toString());
                }
            }
        }
        this.playlistData = outputArray;
        return;
    }
};

WaveSurfer.util.extend(WaveSurfer.Playlist, WaveSurfer.Observer);


}));
