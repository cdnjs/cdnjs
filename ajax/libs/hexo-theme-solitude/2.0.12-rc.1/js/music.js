class MusicPlayer {
    constructor() {
        this.init();
    }
    init() {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
        this.getCustomPlayList();
        this.addEventListenerToDocument();
        this.addButtonListEventListener();
    }

    getCustomPlayList() {
        this.changeMusicBg(false);
    }
    addEventListenerToDocument() {
        document.addEventListener("keydown", this.handleKeydown.bind(this));
    }

    addButtonListEventListener() {
        const aplayerList = document.querySelector(".aplayer-list");
        document.querySelector(".aplayer-lrc")?.addEventListener("click", () => {
            aplayerList.classList.toggle("aplayer-list-hide");
        });
    }

    changeMusicBg(isChangeBg = true) {
        const musicBg = document.getElementById("Music-bg");
        const musicLoading = document.getElementsByClassName("Music-loading")[0];

        if (isChangeBg) {
            this.updateBackgroundImage(musicBg);
        } else {
            this.setLoadingScreen(musicLoading, musicBg);
        }
    }

    updateBackgroundImage(element) {
        const musicCover = document.querySelector("#Music-page .aplayer-pic");
        const img = new Image();
        img.src = this.extractValue(musicCover.style.backgroundImage);
        img.onload = () => {
            element.style.backgroundImage = musicCover.style.backgroundImage;
        };
        element.className = 'show'
    }

    setLoadingScreen(loadingElement, backgroundElement) {
        const timer = setInterval(() => {
            const musicCover = document.querySelector("#Music-page .aplayer-pic");
            if (musicCover) {
                loadingElement.style.display = "none";
                clearInterval(timer);
                document.querySelector('meting-js');
                this.addEventListenerChangeMusicBg();
                backgroundElement.style.display = "block";
            }
            this.addButtonListEventListener();
        }, 100);
    }

    extractValue(input) {
        const valueRegex = /url\("([^"]+)"\)/;
        const match = valueRegex.exec(input);
        return match ? match[1] : '';
    }

    addEventListenerChangeMusicBg() {
        const aplayer = document.querySelector("#Music-page meting-js").aplayer;
        aplayer.on('loadeddata', this.changeMusicBg.bind(this, true));
        aplayer.on('timeupdate', this.lrcUpdate.bind(this));
    }

    lrcUpdate() {
        const aplayerLrcContents = document.querySelector('.aplayer-lrc-contents');
        const currentLrc = aplayerLrcContents.querySelector('p.aplayer-lrc-current');
        if (currentLrc) {
            const currentIndex = Array.from(aplayerLrcContents.children).indexOf(currentLrc);
            aplayerLrcContents.style.transform = `translateY(${-currentIndex * 80}px)`;
        }
    }

    handleKeydown(event) {
        const aplayer = document.querySelector('meting-js').aplayer;
        switch (event.code) {
            case "Space":
                event.preventDefault();
                aplayer.toggle();
                break;
            case "ArrowRight":
                event.preventDefault();
                aplayer.skipForward();
                break;
            case "ArrowLeft":
                event.preventDefault();
                aplayer.skipBack();
                break;
            case "ArrowUp":
                event.preventDefault();
                if (aplayer.volume < 1) aplayer.volume(aplayer.volume + 0.1);
                break;
            case "ArrowDown":
                event.preventDefault();
                if (aplayer.volume > 0) aplayer.volume(aplayer.volume - 0.1);
                break;
        }
    }
    destroy() {
        document.removeEventListener("keydown", this.handleKeydown);
    }
}

function initializeMusicPlayer() {
    let exitingMusic = window.scoMusic;
    if (exitingMusic) exitingMusic.destroy();
    window.scoMusic = new MusicPlayer();
}