import { EventEmitter, Listener } from '../src';

describe('EventEmitter', () => {

    it('should instantiate a new event emitter', () => {
        const eventEmitter = new EventEmitter();

        expect(eventEmitter).toBeDefined();
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
    });

    it('listeners', () => {
        const eventEmitter = new EventEmitter();

        eventEmitter.addListener('test', () => null);

        expect(eventEmitter.listeners('nonExistentListener')).toStrictEqual([]);
        expect(eventEmitter.listeners('nonExistentListener')).toHaveLength(0);
        expect(eventEmitter.listeners('test')).toHaveLength(1);
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

        const events = eventEmitter.events.get('test') as Listener[];

        expect(events[0].fn.toString()).toEqual((() => 'prependedListener').toString());
        expect(events[1].fn.toString()).toEqual((() => 'addedListener').toString());
        expect(
            events[1].toString() === (() => 'prependListener').toString(),
            ).toBeFalsy();
    });

    it('removeAllListeners', () => {
        const eventEmitter = new EventEmitter();

        expect(() => eventEmitter.removeAllListeners()).toThrow('There are currently no event listeners to remove.');

        eventEmitter.addListener('test', () => null);

        expect(eventEmitter.events.size).toBe(1);
        expect(() => eventEmitter.removeAllListeners('nonExistentListener')).toThrow('Event listener: nonExistentListener, was not found.');
        expect(() => eventEmitter.removeAllListeners('test')).not.toThrow();
        expect(eventEmitter.events.size).toBe(0);
    });

    it('removeListener', () => {
        const eventEmitter = new EventEmitter();

        expect(() => eventEmitter.removeListener('nonExistentListener', () => null)).toThrow();
        // tslint:disable-next-line:only-arrow-functions
        expect(() => eventEmitter.addListener('test', function(a: number, b: number) { return a + b; })).not.toThrow();
        expect(() => eventEmitter.removeListener('test', (a: number, b: number) => a + b)).not.toThrow();
        expect(eventEmitter.events.size).toBe(0);

        eventEmitter.addListener('test', () => null);
        eventEmitter.addListener('test', () => null);
        eventEmitter.addListener('anotherTest', () => 1);

        expect(eventEmitter.events.size).toBe(2);
        expect(() => eventEmitter.removeListener('test', () => null)).not.toThrow();
        expect(eventEmitter.events.size).toBe(1);
    });
});
