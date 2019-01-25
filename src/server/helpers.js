const url = require('url');
const manifest = require('./utils/manifest');
const { amplitude } = require('./config');

const assetPath = path => (manifest ? manifest[path] : path);

const helpers = () => (req, res, next) => {
  const isLinkActive = href => url.parse(href).path === req.url;

  Object.assign(res.locals, {
    req,
    assetPath,
    isLinkActive,
    amplitude,
  });

  next();
};

module.exports = helpers;
