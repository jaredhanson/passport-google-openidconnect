/* global describe, it, expect */
/* jshint expr: true */

var GoogleStrategy = require('../lib/strategy')
  , chai = require('chai');


describe('Strategy', function() {
  
  it('should construct', function() {
    var strategy = new GoogleStrategy({
      clientID: 's6BhdRkqt3',
      clientSecret: 'some_secret12345'
    }, function() {});
    
    expect(strategy.name).to.equal('google');
    expect(strategy._issuer).to.equal('https://accounts.google.com');
    expect(strategy._oauth2._authorizeUrl).to.equal('https://accounts.google.com/o/oauth2/v2/auth');
    expect(strategy._oauth2._accessTokenUrl).to.equal('https://www.googleapis.com/oauth2/v4/token');
  }); // should construct
  
});