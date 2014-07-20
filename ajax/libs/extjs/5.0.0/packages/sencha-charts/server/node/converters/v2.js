var validator = require('../validator.js');

var DEFAULT_FORMAT = 'png';

var FORMATS = {
    gif: 'image/gif',
    jpeg: 'image/jpeg',
    pdf: 'application/pdf',
    png: 'image/png'
};

var VALID_POST_DATA = {
    version: 'string',
    data: 'string',
    format: 'string',
    filename: /^[^ \\/:*?""<>|]+([ ]+[^ \\/:*?""<>|]+)*$/g,
    width: 'string',
    height: 'string',
    scale: 'string',
    pdf: 'string',
    jpeg: 'string'
};

var VALID_PDF_OPTIONS = {
    width: 'string',
    height: 'string',
    border: 'string',
    format: 'string',
    orientation: 'string'
};

var VALID_JPEG_OPTIONS = {
    quality: 'string'
};


function convert(config) {
    config = validator.verifyConfig(config, VALID_POST_DATA);
    if (config.format in FORMATS) {
        config.contentType = FORMATS[config.format];
    } else {
        config.format = DEFAULT_FORMAT;
        config.contentType = FORMATS[DEFAULT_FORMAT];
    }
    if (config.pdf) {
        try {
            config.pdf = validator.verifyConfig(JSON.parse(config.pdf), VALID_PDF_OPTIONS);
        } catch (e) {
            console.error("Parsing 'pdf' config failed.", e);
        }
    }
    if (config.jpeg) {
        try {

        } catch (e) {
            console.error("Parsing 'jpeg' config failed.", e);
        }
        config.jpeg = validator.verifyConfig(JSON.parse(config.jpeg), VALID_JPEG_OPTIONS);
    }
    config.width = config.width || 0;
    config.height = config.height || 0;
    config.scale = config.scale || 1;
    return config;
}


module.exports = {
    convert: convert
};