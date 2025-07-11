'use strict';

var attempt = require('..');
require('should');

describe('attempt-promise', function () {
	it('should accept a node-style callback function', function (done) {
		attempt(function (cb) {
			cb(null, 'ok');
		}).then(function (result) {
			result.should.equal('ok');
			done();
		});
	});

	it('should accept options', function (done) {
		var error;
		attempt({
			retries: 0,
			onError: function(err) {
				error = err;
			}
		},
		function (cb) {
			cb(new Error('crap'));
		}).catch(function (err) {
			error.message.should.equal('crap');
			err.message.should.equal('crap');
			done();
		});
	});

	it('should accept a function that returns a promise', function (done) {
		attempt(function () {
			return Promise.resolve('ok');
		}).then(function (result) {
			result.should.equal('ok');
			done();
		});
	});


	it('should reject on all attempts failed with promise callback ', function (done) {
		attempt(function () {
			return Promise.reject(new Error('crap'));
		}).catch(function (err) {
			err.message.should.equal('crap');
			done();
		});
	});

});
