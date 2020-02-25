var data = self.data;
if (data.memory) {
  Tiff.initialize({ TOTAL_MEMORY: data.memory });
}
var xhr = new XMLHttpRequest();
xhr.open('GET', data.url, false);
xhr.responseType = 'arraybuffer';
xhr.send(null);
var tiff = new Tiff({buffer: xhr.response});
var image = tiff.readRGBAImage();
self.res = { image: image, width: tiff.width(), height: tiff.height() };
