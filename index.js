'use strict';
var attempt = require('attempt');

module.exports = function (opts, fn) {
	if (!fn) {
		fn = opts;
		opts = {};
	}

	return new Promise(function (resolve, reject) {
		attempt(
			opts,
			function () {
				var next = this;
				var p = fn(next);
				if (p && typeof p.then === 'function') {
					p.then(function (result) {
						next(null, result);
					})
					.catch(function (e) {
						next(e);
					});
				}
			},
			function (err, results) {
				if (err) {
					return reject(err);
				}
				resolve(results);
			}
		);
	});
};
