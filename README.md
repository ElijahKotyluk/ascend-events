# ts-eventemitter

[![Build Status](https://travis-ci.com/ElijahKotyluk/ts-eventemitter.svg?branch=master)](https://travis-ci.com/ElijahKotyluk/ts-eventemitter)
[![codecov](https://codecov.io/gh/ElijahKotyluk/ts-eventemitter/branch/master/graph/badge.svg)](https://codecov.io/gh/ElijahKotyluk/ts-eventemitter)

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
Adds a new event listener to the end of the `listener` array that is associated with the passed key(`eventName`). If no key is found, it will set a new element using the passed `eventName` and `listener`.

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

### getListenerCount
Returns the number of listeners associated with the passed `eventName`

`params`

* `eventName` **{string} | {symbol}** (required) The name of the event to get the listener count of

`returns`

* **{number}**

```ts
const eventEmitter = new EventEmitter();

eventEmitter.addListener('msg', (msg: msg) => console.log('msg: ', msg));

eventEmitter.getListenerCount('msg'); // will return 1
eventEmitter.getListenerCount('doesntExist'); // will return 0
```

### setMaxListeners
Sets the maximum number of listeners on **this** instance of the EventEmitter

`params`

* `num` **{number}** (required) The number of maximum listeners

`returns`

* `this` **{EventEmitter}**

```ts
const eventEmitter = new EventEmitter();

eventEmitter.setMaxListeners(5);

console.log(eventEmitter.maxListeners); // will print 5
```
