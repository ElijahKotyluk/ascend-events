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

### emit
Calls each listener associated with the passed `eventName` in the order that they were added. Additional arguments are passed to each listener callback.

`params`

* `eventName` **{string} | {symbol}** (required) The name of the event being emitted
* `...args` **{any[]}** (Optional) Arguments to be passed to each listener callback

`returns`

* `this` **{EventEmitter}**

```ts
const eventEmitter = new EventEmitter();

eventEmitter.add('test', (msg: string) => console.log('msg: ', msg));

eventEmitter.emit('test', 'hello world');

// Output: 'msg: hello world'
```