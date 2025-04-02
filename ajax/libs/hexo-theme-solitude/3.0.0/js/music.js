class MusicPlayer {
    constructor() {
        this.init();
    }

    init() {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
        this.getCustomPlayList();
        this.addEventListeners();
    }

    getCustomPlayList() {
        this.changeMusicBg(false);
    }

    addEventListeners() {
        document.addEventListener("keydown", this.handleKeydown.bind(this));
        const aplayerList = document.querySelector(".aplayer-list");
        const aplayerLrc = document.querySelector(".aplayer-lrc");
        if (aplayerLrc && !aplayerLrc.dataset.clickBound) {
            aplayerLrc.addEventListener("click", () => {
                aplayerList.classList.toggle("aplayer-list-hide");
            });
            aplayerLrc.dataset.clickBound = true;
        }
    }

    changeMusicBg(isChangeBg = true) {
        const musicBg = document.getElementById("Music-bg");
        const musicLoading = document.getElementsByClassName("Music-loading")[0];

        isChangeBg ? this.updateBackgroundImage(musicBg) : this.setLoadingScreen(musicLoading, musicBg);
    }

    updateBackgroundImage(element) {
        const musicCover = document.querySelector("#Music-page .aplayer-pic");
        const img = new Image();
        img.src = this.extractValue(musicCover.style.backgroundImage);
        img.onload = () => {
            element.style.backgroundImage = musicCover.style.backgroundImage;
            element.className = 'show';
        };
    }

    setLoadingScreen(loadingElement, backgroundElement) {
        const timer = setInterval(() => {
            this.addEventListeners();
            const musicCover = document.querySelector("#Music-page .aplayer-pic");
            if (musicCover) {
                loadingElement.style.display = "none";
                clearInterval(timer);
                this.addEventListenerChangeMusicBg();
                backgroundElement.style.display = "block";
            }
        }, 100);
    }

    extractValue(input) {
        const match = /url\("([^"]+)"\)/.exec(input);
        return match ? match[1] : '';
    }

    addEventListenerChangeMusicBg() {
        const aplayer = document.querySelector("#Music-page meting-js").aplayer;
        aplayer.on('loadeddata', () => this.changeMusicBg(true));
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
        const actions = {
            "Space": () => aplayer.toggle(),
            "ArrowRight": () => aplayer.skipForward(),
            "ArrowLeft": () => aplayer.skipBack(),
            "ArrowUp": () => { if (aplayer.volume < 1) aplayer.volume(aplayer.volume + 0.1); },
            "ArrowDown": () => { if (aplayer.volume > 0) aplayer.volume(aplayer.volume - 0.1); }
        };

        if (actions[event.code]) {
            event.preventDefault();
            actions[event.code]();
        }
    }

    destroy() {
        document.removeEventListener("keydown", this.handleKeydown);
    }
}

function initializeMusicPlayer() {
    const exitingMusic = window.scoMusic;
    if (exitingMusic) exitingMusic.destroy();
    window.scoMusic = new MusicPlayer();
}