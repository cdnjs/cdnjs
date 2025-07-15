if (process.env.NODE_ENV === 'production') {
    module.exports = require('./san.js');
} else {
    module.exports = require('./san.dev.js');
}
