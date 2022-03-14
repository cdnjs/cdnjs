var data = self.data;
if (data.memory) {
  Tiff.initialize({ TOTAL_MEMORY: data.memory });
}
var tiff = new Tiff({buffer: data.data});
var image = tiff.readRGBAImage();
self.res = { image: image, width: tiff.width(), height: tiff.height() };
