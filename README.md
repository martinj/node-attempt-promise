[![Build Status](https://travis-ci.org/martin/node-attempt-promise.svg)](https://travis-ci.org/martinj/node-attempt-promise)

# attempt-promise

A wrapper that returns promises for [attempt](https://github.com/TomFrost/node-attempt)

## Installation

	$ npm install attempt-promise

## Examples

Using node style callback function

```javascript
attempt({retries: 2}, function (cb) {
	cb(null, 'ok');
}).then(function (result) {
	console.log('Yes!', result);
});
```

Using a function that returns a promise

```javascript
attempt(function () {
	return Promise.resolve('ok');
}).then(function (result) {
	console.log('Yes!', result);
});
```
