const scoMusic = {
    params: new URLSearchParams(window.location.search),
    extractValue: (input) => {
        const valueRegex = /\("([^\s]+)"\)/g;
        const match = valueRegex.exec(input);
        return match[1];
    },
    changeMusicBg: (isChangeBg = true) => {
        const MusicBg = document.getElementById("Music-bg");
        const MusicLoading = document.getElementsByClassName("Music-loading");

        if (isChangeBg) {
            const musiccover = document.querySelector("#Music-page .aplayer-pic");
            const img = new Image();
            img.src = scoMusic.extractValue(musiccover.style.backgroundImage);
            img.onload = () => {
                MusicBg.style.backgroundImage = musiccover.style.backgroundImage;
            };
        } else {
            const timer = setInterval(() => {
                const musiccover = document.querySelector("#Music-page .aplayer-pic");
                if (musiccover) {
                    MusicLoading[0].style.display = "none";
                    clearInterval(timer);
                    document.querySelector('meting-js').aplayer.volume(0.8, true);

                    scoMusic.addEventListenerChangeMusicBg();
                    MusicBg.style.display = "block";
                }
            }, 100);
        }
    },
    lrcupdate: () => {
        const aplayerLrcContents = document.querySelector('.aplayer-lrc-contents');
        const currentLrc = aplayerLrcContents.querySelector('p.aplayer-lrc-current');

        if (currentLrc) {
            const currentIndex = Array.from(aplayerLrcContents.children).indexOf(currentLrc);
            const translateYValue = -currentIndex * 80;

            aplayerLrcContents.style.transform = `translateY(${translateYValue}px)`;
        }
    },
    buttonlist: () => {
        const aplayerList = document.querySelector(".aplayer-list");
        if (aplayerList) {
            document.querySelector(".aplayer-lrc").addEventListener("click", () => {
                if (aplayerList.classList.contains("aplayer-list-hide")) {
                    aplayerList.classList.remove("aplayer-list-hide");
                } else {
                    aplayerList.classList.add("aplayer-list-hide");
                }
            });
        }
    },
   extractValue: (input) => {
        const valueRegex = /\("([^\s]+)"\)/g;
        const match = valueRegex.exec(input);
        return match[1];
    },
    changeMusicBg: (isChangeBg = true) => {
        const MusicBg = document.getElementById("Music-bg");
        const MusicLoading = document.getElementsByClassName("Music-loading");

        if (isChangeBg) {
            const musiccover = document.querySelector("#Music-page .aplayer-pic");
            const img = new Image();
            img.src = scoMusic.extractValue(musiccover.style.backgroundImage);
            img.onload = () => {
                MusicBg.style.backgroundImage = musiccover.style.backgroundImage;
            };
        } else {
            const timer = setInterval(() => {
                const musiccover = document.querySelector("#Music-page .aplayer-pic");
                if (musiccover) {
                    MusicLoading[0].style.display = "none";
                    clearInterval(timer);
                    document.querySelector('meting-js').aplayer.volume(0.8, true);

                    scoMusic.addEventListenerChangeMusicBg();
                    MusicBg.style.display = "block";
                }
            }, 100);
        }
    },
    lrcupdate: () => {
        const aplayerLrcContents = document.querySelector('.aplayer-lrc-contents');
        const currentLrc = aplayerLrcContents.querySelector('p.aplayer-lrc-current');

        if (currentLrc) {
            const currentIndex = Array.from(aplayerLrcContents.children).indexOf(currentLrc);
            const translateYValue = -currentIndex * 80;

            aplayerLrcContents.style.transform = `translateY(${translateYValue}px)`;
        }
    },
    buttonlist: () => {
        const aplayerList = document.querySelector(".aplayer-list");
        if (aplayerList) {
            document.querySelector(".aplayer-lrc").addEventListener("click", () => {
                if (aplayerList.classList.contains("aplayer-list-hide")) {
                    aplayerList.classList.remove("aplayer-list-hide");
                } else {
                    aplayerList.classList.add("aplayer-list-hide");
                }
            });
        }
    },
    addEventListenerChangeMusicBg: () => {
        const aplayer = document.getElementById("Music-page").querySelector("meting-js").aplayer;
        aplayer.on('loadeddata', () => {
            scoMusic.changeMusicBg();
        });
        aplayer.on('timeupdate', () => {
            scoMusic.lrcupdate();
        });
    },
    getCustomPlayList: () => {
        const MusicPage = document.getElementById("Music-page");
        const playlistType = scoMusic.params.get("type") || "playlist";

        if (scoMusic.params.get("id") && params.get("server")) {
            const id = scoMusic.params.get("id");
            const server = scoMusic.params.get("server");
            MusicPage.innerHTML = `<meting-js id="${id}" server="${server}" type="${playlistType}" preload="auto" order="random"></meting-js>`;
        } else {
            MusicPage.innerHTML = `<meting-js id="${musicConfig.userId}" server="${musicConfig.userServer}" type="${musicConfig.userType}" preload="auto" order="random"></meting-js>`;
        }
        scoMusic.changeMusicBg(false);
    },
    setKeydown: (event) => {
        const aplayer = document.querySelector('meting-js').aplayer;
        if (event.code === "Space") {
            event.preventDefault();
            aplayer.toggle();
        }
        if (event.keyCode === 39) {
            event.preventDefault();
            aplayer.skipForward();
        }
        if (event.keyCode === 37) {
            event.preventDefault();
            aplayer.skipBack();
        }
        if (event.keyCode === 38) {
            if (musicConfig.volume <= 1) {
                musicConfig.volume += 0.1;
                aplayer.volume(musicConfig.volume, true);
            }
        }
        if (event.keyCode === 40) {
            if (musicConfig.volume >= 0) {
                musicConfig.volume += -0.1;
                aplayer.volume(musicConfig.volume, true);
            }
        }
    },
    init: () => {
        let vh = window.innerHeight * 1;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        scoMusic.getCustomPlayList();
        document.addEventListener("keydown", scoMusic.setKeydown);
    }
};

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 1;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});