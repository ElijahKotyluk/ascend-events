import { EventEmitter, Listener } from '../src';

describe('EventEmitter', () => {

    it('should create a new event emitter instance', () => {
        const eventEmitter = new EventEmitter();

        expect(eventEmitter).toBeInstanceOf(EventEmitter);
        expect(eventEmitter.events).toBeInstanceOf(Map);
        expect(eventEmitter.maxListeners).toBe(10);
    });

    it('addListener', () => {
        const eventEmitter = new EventEmitter();

        eventEmitter.addListener('test', () => 'test 1');
        eventEmitter.addListener('test', () => 'test 2');
        expect(eventEmitter.events.size).toBe(1);
        expect(eventEmitter.events.get('test') as Listener[]).toHaveLength(2);

        eventEmitter.addListener('anotherTest', () => 'another test');
        expect(eventEmitter.events.size).toBe(2);

        eventEmitter.maxListeners = 1;

        expect(() => eventEmitter.addListener('test', () => null)).toThrow(Error);
    });

    it('emit', () => {
        const eventEmitter = new EventEmitter();
        const fn = jest.fn();

        eventEmitter.once('test', fn);

        expect(eventEmitter.events.get('test')).toHaveLength(1);

        eventEmitter.emit('test', true);

        expect(eventEmitter.events.get('test')).toBeUndefined();
        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn).toHaveBeenCalledWith(true);

        eventEmitter.addListener('test', fn);
        eventEmitter.emit('test', true);
        eventEmitter.addListener('error', () => { throw new Error(); });

        expect(fn).toHaveBeenCalledTimes(2);
        expect(fn).toHaveBeenLastCalledWith(true);
        expect(() => eventEmitter.emit('error')).toThrowError();
        expect(eventEmitter.emit('doesntExist')).toBeInstanceOf(EventEmitter);
    });

    it('getListenerCount', () => {
        const eventEmitter = new EventEmitter();

        eventEmitter.addListener('test', () => null);

        expect(eventEmitter.getListenerCount('nonExistentListener')).toBe(0);
        expect(eventEmitter.getListenerCount('test')).toBe(1);
    });

    it('setMaxListeners', () => {
        const eventEmitter = new EventEmitter();

        expect(eventEmitter.maxListeners).toBe(10);

        eventEmitter.setMaxListeners(5);
        expect(eventEmitter.maxListeners).toBe(5);

        expect(() => eventEmitter.setMaxListeners(0)).toThrowError();
        expect(() => eventEmitter.setMaxListeners(-1)).toThrowError();
    });

    it('listeners', () => {
        const eventEmitter = new EventEmitter();

        eventEmitter.addListener('test', () => null);

        expect(eventEmitter.listeners('nonExistentListener')).toStrictEqual([]);
        expect(eventEmitter.listeners('nonExistentListener')).toHaveLength(0);
        expect(eventEmitter.listeners('test')).toHaveLength(1);
    });

    it('off', () => {
        const eventEmitter = new EventEmitter();

        eventEmitter.addListener('test', () => null);

        expect(eventEmitter.getListenerCount('test')).toBe(1);

        eventEmitter.off('test', () => null);

        expect(eventEmitter.getListenerCount('test')).toBe(0);
    });

    it('on', () => {
        const eventEmitter = new EventEmitter();

        eventEmitter.on('test', () => true);

        expect(eventEmitter.getListenerCount('test')).toBe(1);
        expect(eventEmitter.on('test', () => false)).toBeInstanceOf(EventEmitter);
        expect(eventEmitter.events.has('test')).toBeTruthy();
    });

    it('prependListener', () => {
        const eventEmitter = new EventEmitter();

        eventEmitter.addListener('test', () => 'addedListener');
        eventEmitter.prependListener('test', () => 'prependedListener');
        eventEmitter.prependListener('testTwo', () => 'testTwo');

        const events = eventEmitter.events.get('test') as Listener[];

        expect(eventEmitter.events.size).toBe(2);
        expect(events[0].fn.toString()).toEqual((() => 'prependedListener').toString());
        expect(events[1].fn.toString()).toEqual((() => 'addedListener').toString());
        expect(
            events[1].toString() === (() => 'prependListener').toString(),
            ).toBeFalsy();
    });

    it('prependOnceListener', () => {
        const eventEmitter = new EventEmitter();

        eventEmitter.prependOnceListener('test', () => 'once');

        expect(eventEmitter.events.size).toBe(1);

        eventEmitter.emit('test');

        expect(eventEmitter.events.size).toBe(0);
    });

    it('removeAllListeners', () => {
        const eventEmitter = new EventEmitter();

        expect(() => eventEmitter.removeAllListeners()).toThrow('There are currently no event listeners to remove.');

        eventEmitter.addListener('test', () => null);
        eventEmitter.addListener('testTwo', () => 'testTwo');

        expect(eventEmitter.events.size).toBe(2);
        expect(() => eventEmitter.removeAllListeners('nonExistentListener')).toThrow('Event listener: nonExistentListener, was not found.');
        expect(() => eventEmitter.removeAllListeners('test')).not.toThrow();
        expect(eventEmitter.events.size).toBe(1);

        eventEmitter.removeAllListeners();
        expect(eventEmitter.events.size).toBe(0);
    });

    it('removeListener', () => {
        const eventEmitter = new EventEmitter();

        expect(() => eventEmitter.removeListener('nonExistentListener', () => null)).toThrow();
        expect(() => eventEmitter.addListener('test', (a: number, b: number) => a + b)).not.toThrow();
        expect(() => eventEmitter.removeListener('test', (a: number, b: number) => a + b)).not.toThrow();
        expect(eventEmitter.events.size).toBe(0);

        eventEmitter.addListener('test', () => null);
        eventEmitter.addListener('test', () => null);
        eventEmitter.addListener('anotherTest', () => 1);
        eventEmitter.addListener('anotherTest', () => 2);

        expect(eventEmitter.listeners('anotherTest')).toHaveLength(2);

        eventEmitter.removeListener('anotherTest', () => 2);

        expect(eventEmitter.listeners('anotherTest')).toHaveLength(1);

        expect(eventEmitter.events.size).toBe(2);
        expect(() => eventEmitter.removeListener('test', () => null)).not.toThrow();
        expect(() => eventEmitter.removeListener('test', () => 'errored')).toThrow();
        expect(eventEmitter.events.size).toBe(1);
    });
});
