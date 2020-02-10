var type = self.data.type,
	bin = self.data.bin,
	hashOpts = self.data.hashOpts;

self.res = {};
if (type === 'md5') {
	let sp = new self.SparkMD5.ArrayBuffer();
	sp.append(bin);
	self.res.hash = sp.end();
} else {
	let sha = new jsSHA('SHA' + (type.length === 5? type : ('-' + type)).toUpperCase(), 'ARRAYBUFFER'),
		opts = {};
	if (type === 'ke128') {
		opts.shakeLen = hashOpts.shake128len;
	} else if (type === 'ke256') {
		opts.shakeLen = hashOpts.shake256len;
	}
	sha.update(bin);
	self.res.hash = sha.getHash('HEX', opts);
}
