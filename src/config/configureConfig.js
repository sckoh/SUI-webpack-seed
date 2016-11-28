if (process.env.NODE_ENV === 'live') {
  module.exports = require('./config.live').default;
} else {
  module.exports = require('./config.dev').default;
}
