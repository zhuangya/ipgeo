'use strict';

var ipgeo = require('./');
var assert = require('assert');

describe('ipgeo', function () {
  it('8.8.8.8 should be a google ip', function (done) {
    ipgeo('8.8.8.8', function (err, geoinfo) {
      assert.equal(geoinfo.isp, 'Google Inc.');
      assert.equal(geoinfo.ip, '8.8.8.8');
      done();
    });
  });

  it('should send a error when ip is private', function (done) {
    ipgeo('127.0.0.1', function (err, geoinfo) {
      assert.equal(err.message, 'private ip');
      done();
    });
  });

  it('should complain when passing an invalid ip', function (done) {
    ipgeo('there is no spoon', function (err, geoinfo) {
      assert.equal(err.message, 'not a valid ip');
      done();
    });
  });
});
