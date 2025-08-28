var type = self.data.type,
	bin = new Uint8Array(self.data.bin),
	unzipFiles = function() {
		/** @type {Array.<string>} */
		var filenameList = [];
		/** @type {number} */
		var i;
		/** @type {number} */
		var il;
		/** @type {Array.<Zlib.Unzip.FileHeader>} */
		var fileHeaderList;
		// need check this.Y when update cdns.zlibUnzip
		this.Y();
		fileHeaderList = this.i;
		for (i = 0, il = fileHeaderList.length; i < il; ++i) {
			// need check fileHeaderList[i].J when update cdns.zlibUnzip
			filenameList[i] = fileHeaderList[i].filename + (fileHeaderList[i].J? ' ({formatSize(' + fileHeaderList[i].J + ')})' : '');
		}
		return filenameList;
	},
	tarFiles = function(tar) {
		var filenames = [],
			tarlen = tar.length,
			offset = 0,
			toStr = function(arr) {
				return String.fromCharCode.apply(null, arr).replace(/\0+$/, '');
			},
			h, name, prefix, size, dbs;
		while (offset < tarlen && tar[offset] !== 0) {
			h = tar.subarray(offset, offset + 512);
			name = toStr(h.subarray(0, 100));
			if (prefix = toStr(h.subarray(345, 500))) {
				name = prefix + name;
			}
			size = parseInt(toStr(h.subarray(124, 136)), 8);
			dbs = Math.ceil(size / 512) * 512;
			if (name === '././@LongLink') {
				name = toStr(tar.subarray(offset + 512, offset + 512 + dbs));
			}
			(name !== 'pax_global_header') && filenames.push(name + (size? ' ({formatSize(' + size + ')})': ''));
			offset = offset + 512 + dbs;
		}
		return filenames;
	};

self.res = {};

switch (type) {
  case 'tar':
    self.res.files = tarFiles(bin);
    break;
  case 'zip':
    self.res.files = unzipFiles.call(new Zlib.Unzip(bin));
    break;
  case 'gzip':
    self.res.files = tarFiles(new Zlib.Gunzip(bin).decompress());
    break;
  case 'bzip2':
    self.res.files = tarFiles(self.bzip2.simple(self.bzip2.array(bin)));
    break;
  default:
    
    break;
}

