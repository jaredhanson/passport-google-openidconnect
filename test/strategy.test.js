/* global describe, it, expect */
/* jshint expr: true */

var GoogleStrategy = require('../lib/strategy')
  , chai = require('chai');


describe('Strategy', function() {
  
  describe('constructed', function() {
    var strategy = new GoogleStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, function() {});
    
    it('should be named google', function() {
      expect(strategy.name).to.equal('google');
    });
  })
  
  describe('constructed with undefined options', function() {
    it('should throw', function() {
      expect(function() {
        var strategy = new GoogleStrategy(undefined, function(){});
      }).to.throw(Error);
    });
  })
  
});