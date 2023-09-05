const audioList = [];
const isFixed = Global.theme_config.plugins.aplayer.type == "fixed"
const isMini = Global.theme_config.plugins.aplayer.type == "mini"



for (const audio of Global.theme_config.plugins.aplayer.audios) {
    const a = {
      name: audio.name,
      artist: audio.artist,
      url: audio.url,
      cover: audio.cover,
      lrc: audio.lrc,
      theme: audio.theme,
    };
    audioList.push(a);
}


if (isMini) {
  const ap = new APlayer({
      container: document.getElementById('aplayer'),
      mini: true,
      audio: audioList,
  });
} else if (isFixed) {
  const ap = new APlayer({
      container: document.getElementById('aplayer'),
      fixed: true,
      audio: audioList,
  });
}
