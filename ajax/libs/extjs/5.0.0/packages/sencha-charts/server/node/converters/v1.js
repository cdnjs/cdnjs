var validator = require('../validator.js');

var CONTENT_TYPES = {
    'image/jpeg': 'jpeg',
    'image/png': 'png'
};

var VALID_POST_DATA = {
    svg: 'string',
    type: 'string',
    width: 'string',
    height: 'string'
};


function verifyImageData(data) {
    if (typeof data !== 'string') {
        return;
    }
    if (data.substr(0, 5) === '<?xml') {
        // convert SVG XML to DataURL format
        data = 'data:image/svg+xml;utf8,' + encodeURIComponent(data);
    }
    return data;
}

function convert(config) {
    config = validator.verifyConfig(config, VALID_POST_DATA);
    config.data = verifyImageData(config.svg);
    delete config.svg;
    if (config.type in CONTENT_TYPES) {
        config.format = CONTENT_TYPES[config.type];
        config.contentType = config.type;
    } else {
        config.format = 'png';
        config.contentType = 'image/png';
    }
    config.width = config.width || 0;
    config.height = config.height || 0;
    config.scale = config.scale || 1;
    return config;
}


module.exports = {
    convert: convert
};