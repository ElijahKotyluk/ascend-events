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
    });

    it('getListenerCount', () => {
        const eventEmitter = new EventEmitter();

        expect(eventEmitter.getListenerCount('nonExistentListener')).toBe(0);

        eventEmitter.addListener('test', () => null);

        expect(eventEmitter.getListenerCount('test')).toBe(1);
    });
});
