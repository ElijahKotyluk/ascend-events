import { EventEmitter } from '../src';

describe('EventEmitter', () => {

    it('should instantiate a new event emitter', () => {
        const eventEmitter = new EventEmitter();

        expect(eventEmitter).toBeDefined();
        expect(eventEmitter).toBeInstanceOf(EventEmitter);
        expect(eventEmitter.maxListeners).toBe(10);
    });

    it('addListener', () => {
        const eventEmitter = new EventEmitter();

        eventEmitter.addListener('test', () => null);
        expect(eventEmitter.events.size).toBe(1);

        eventEmitter.maxListeners = 1;

        expect(() => eventEmitter.addListener('test', () => null)).toThrow(Error);
    });

    it('getListenerCount', () => {
        const eventEmitter = new EventEmitter();

        expect(eventEmitter.getListenerCount('nonExistentListener')).toBe(0);

        eventEmitter.addListener('test', () => null);

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

        expect(eventEmitter.listeners('nonExistentListener')).toStrictEqual([]);
        expect(eventEmitter.listeners('nonExistentListener')).toHaveLength(0);

        eventEmitter.addListener('test', () => null);
        expect(eventEmitter.listeners('test')).toHaveLength(1);
    });

    it('on', () => {
        const eventEmitter = new EventEmitter();

        eventEmitter.on('test', () => true);

        expect(eventEmitter.getListenerCount('test')).toBe(1);
        expect(eventEmitter.on('test', () => false)).toBeInstanceOf(EventEmitter);
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

        eventEmitter.addListener('test', function (a: number, b: number) { return a + b; });

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
