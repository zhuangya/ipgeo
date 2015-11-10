'use strict';

var ip = require('ip');
var ipRegex = require('ip-regex');
var request = require('superagent');
var debug = require('debug')('IPGEO');

module.exports = function getGeoInfo (targetIP, cb) {

  cb = cb || noop;

  var ipType = typeof targetIP;
  debug('typeof ip %s', ipType);
  if (ipType === 'function') {
    cb = targetIP;
    targetIP = ip.address();
  }

  debug(targetIP);

  var endPoint = 'http://www.telize.com/geoip/' + targetIP;

  debug(endPoint);

  if (!ipRegex({ exact: true }).test(targetIP)) {
    debug('invalid ip: %s', targetIP);
    cb(new Error('not a valid ip'));
  } else if (ip.isPrivate(targetIP)) {
    debug('private ip: %s', targetIP);
    cb(new Error('private ip'));
  } else {
    debug('sending request');
    request.get(endPoint)
      .end(function (err, res) {
        if (err) {
          debug(err);
          cb(err);
        } else {
          debug(res.body);
          cb(null, res.body);
        }
      });
  }

}

function noop () {}
