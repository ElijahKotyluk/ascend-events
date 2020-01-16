# ts-eventemitter

[![Build Status](https://travis-ci.com/ElijahKotyluk/ts-eventemitter.svg?branch=master)](https://travis-ci.com/ElijahKotyluk/ts-eventemitter)
[![codecov](https://codecov.io/gh/ElijahKotyluk/ts-eventemitter/branch/master/graph/badge.svg)](https://codecov.io/gh/ElijahKotyluk/ts-eventemitter)

## API

### EventEmitter
Create an Event Emitter.

```ts
const eventEmitter = new EventEmitter();
```

### addListener
Add's a new event listener to the end of the `events` set

`params`

* `eventName` **{string} | {symbol}** (required) The name of the event being added
* `listener` **{Function}** (required) The callback function

`returns`

* `this` **{EventEmitter}**

```ts
const eventEmitter = new EventEmitter();

eventEmitter.addListener('listener', () => console.log('listener'));
```
