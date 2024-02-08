
/*-------------------------
moovie.js | Playlist Plugin
Made by: Bruno Vieira
--------------------------- */

class _Moovie_Playlist {

    constructor(options) {

        const defaults = {
            reference : 'defaultId',
            sources : [
                {
                  src: false,
                  title: false
                }
            ]
        };      

        this.reference = options.reference || defaults.reference;
        this.sources = options.sources || defaults.sources;
        var mooviePlayer = this.reference;
        var loopSrc = 0;
        var sources = this.sources;

        /*
        ** Plugin Structure
        */
        var InitModule = this.InitModule = function InitModule() {

            mooviePlayer.video.addEventListener("ended", function() {
            mooviePlayer.medialoading.style.display = "block";
            mooviePlayer.moovie_el_controlbar.style.opacity = 0;

            // Wait function 100ms
            setTimeout(function(){ 

                // Check if src is the same
                if(mooviePlayer.video.src == sources[loopSrc].src) {
                    mooviePlayer.video.currentTime = 0;
                    mooviePlayer.medialoading.style.display = "none";
                    mooviePlayer.moovie_el_controlbar.style.opacity = 1;
                } else {

                    // Change Source
                    mooviePlayer.video.src = sources[loopSrc].src; 

                    // New src is ready to play
                    mooviePlayer.video.addEventListener("loadedmetadata", function() {

                    mooviePlayer.medialoading.style.display = "none";
                    mooviePlayer.moovie_el_controlbar.style.opacity = 1;
                    mooviePlayer.video.play();

                    }, true);
                }

                console.log("Now playing: "+sources[loopSrc].title);
      
                // Moves to new sourc
                loopSrc = loopSrc+1;
                if(loopSrc >= sources.length) loopSrc = 0;

             }, 100);

        }, true);
        }

        // Setup
        this.InitModule();
    }
}


