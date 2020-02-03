# Ascend Events

[![Build Status](https://travis-ci.com/ElijahKotyluk/ts-eventemitter.svg?branch=master)](https://travis-ci.com/ElijahKotyluk/ts-eventemitter)
[![codecov](https://codecov.io/gh/ElijahKotyluk/ts-eventemitter/branch/master/graph/badge.svg)](https://codecov.io/gh/ElijahKotyluk/ts-eventemitter)

## Installation

```ts
// npm
npm install --dev ascend-events

// yarn
yarn install --dev ascend-events
```

## API

### EventEmitter

Create an Event Emitter.

```ts
// New EventEmitter
const eventEmitter = new EventEmitter();

// Extend a custom class
class MyClass extends EventEmitter {
    constructor() {
        super();
    }
}
```

### addListener

Adds a new event listener to the end of the `listener` array that is associated with the passed `eventName`. If no key is found, it will set a new element using the passed `eventName` and `listener`.

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
* `...args` **{any[]}** (Optional) Arguments to be passed to each listener function

`returns`

* `this` **{EventEmitter}**

```ts
const eventEmitter = new EventEmitter();

eventEmitter.add('test', (msg: string) => console.log('msg: ', msg));

eventEmitter.emit('test', 'hello world');

// prints 'msg: hello world'
```

### getListenerCount

Returns the number of listeners associated with the passed `eventName`.

`params`

* `eventName` **{string} | {symbol}** (required) The name of the event to get the listener count of

`returns`

* **{number}**

```ts
const eventEmitter = new EventEmitter();

eventEmitter.addListener('msg', (msg: msg) => console.log('msg: ', msg));

eventEmitter.getListenerCount('msg'); // returns 1
eventEmitter.getListenerCount('doesntExist'); // returns 0
```

### setMaxListeners

Sets the maximum number of listeners on **this** instance of the EventEmitter.

`params`

* `num` **{number}** (required) The number of maximum listeners

`returns`

* `this` **{EventEmitter}**

```ts
const eventEmitter = new EventEmitter();

eventEmitter.setMaxListeners(5);

console.log(eventEmitter.maxListeners); // prints 5
```

### listeners

Returns the listeners associated with the passed `eventName`, if no key was found, returns an empty array `[]`.

`params`

* `eventName` **{string} | {symbol}** (required)

`returns`

* `listeners` **{Listener[]}**

```ts
const eventEmitter = new EventEmitter();

eventEmitter.addListener('event', () => null)

eventEmitter.listeners('event') // returns [ { fn: [Function], once: false } ]
```

### off

alias for `EventEmitter.removeListener()`

`params`

* `eventName` **{string} | {symbol}** (required)
* `listener` **{Function}** (required)

`returns`

* `this` **{EventEmitter}**

```ts
const eventEmitter = new EventEmitter();

eventEmitter.on('msg', (msg: string) => console.log('msg: ', msg));

eventEmitter.off('msg', (msg:string) => console.log('msg: ', msg));
```

### on

alias for `eventEmitter.addListener()`

`params`

* `eventName` **{string} | {symbol}** (required)
* `listener` **{Function}** (required)

`returns`

* `this` **{EventEmitter}**

```ts
const eventEmitter = new EventEmitter();

eventEmitter.on('msg', (msg: string) => console.log('msg: ', msg));

eventEmitter.emit('msg', 'hello world');
```

### once

Adds a listener associated to the passed `eventName` that is triggered once and then removed.

`params`

* `eventName` **{string} | {symbol}** (required)
* `listener` **{Function}** (required)

`returns`

* `this` **{EventEmitter}**

```ts
const eventEmitter = new EventEmitter();

eventEmitter.once('msg', (msg: string) => console.log('msg: ', msg));

eventEmitter.emit('msg', 'hello world'); // prints 'msg: hello world'

eventEmitter.listeners('msg'); // returns []
```

### prependListener

Adds the passed `listener` to the beginning of the listener array associated with the given `eventName`.

`params`

* `eventName` **{string} | {symbol}** (required)
* `listener` **{Function}** (required)

`returns`

* `this` **{EventEmitter}**

```ts
const eventEmitter = new EventEmitter();

eventEmitter.addListener('msg', () => 'called second');

eventEmitter.prependListener('msg', () => 'called first');

eventEmitter.emit('msg');
// prints
//  'called first'
//  'called second'
```

### prependOnceListener

Adds the passed `listener` to the beginning of the listener array associated with the given `eventName`, once triggered will be removed.

`params`

* `eventName` **{string} | {symbol}** (required)
* `listener` **{Function}** (required)

`returns`

* `this` **{EventEmitter}**

```ts
const eventEmitter = new EventEmitter();

eventEmitter.prependOnceListener('msg', () => 'One time');

eventEmitter.emit('msg');

eventEmitter.listeners('msg'); // returns []
```

### removeAllListeners

Removes all listeners associated with the passed `eventName`, if no `eventName` was given, all listeners are removed entirely.

`params`

* `eventName` **{string} | {symbol}** (optional)

`returns`

* `this` **{EventEmitter}**

```ts
const eventEmitter = new EventEmitter();

eventEmitter.addListener('msg', () => console.log('gets removed'));
eventEmitter.addListener('msg2', () => console.log('also gets removed'));

eventEmitter.removeAllListeners();
```

### removeListener

Removes `listener` associated with the passed `eventName`

`params`

* `eventName` **{string} | {symbol}** (required)
* `listener` **{Function}** (required)

`returns`

* `this` **{EventEmitter}**

```ts
const eventEmitter = new EventEmitter();

eventEmitter.addListener('msg', () => console.log('gets removed'));
eventEmitter.addListener('msg', () => console.log('does not get removed'));

eventEmitter.removeListener('msg', () => console.log('gets removed'));

eventEmitter.emit('msg'); //  prints 'does not get removed'
```
