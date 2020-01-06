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

    it('setListenerCount', () => {
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
});
