import { EventEmitter } from '../src';

describe('EventEmitter', () => {

    it('should instantiate a new event emitter', () => {
        const eventEmitter = new EventEmitter();

        expect(eventEmitter).toBeDefined();
        expect(eventEmitter).toBeInstanceOf(EventEmitter);
        expect(eventEmitter.listeners).toBe(10);
    });

    it('addListener', () => {
        const eventEmitter = new EventEmitter();

        eventEmitter.addListener('test', () => null);
        expect(eventEmitter.events.size).toBe(1);

        eventEmitter.listeners = 1;

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

        expect(eventEmitter.listeners).toBe(10);

        eventEmitter.setListenerCount(5);
        expect(eventEmitter.listeners).toBe(5);
    });
});
