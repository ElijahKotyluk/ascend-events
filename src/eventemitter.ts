export default class EventEmitter {
    public maxListeners: number;
    public events: Map<string | symbol, Function[]>;

    constructor() {
        this.events = new Map();
        this.maxListeners = 10;
    }

    public getListenerCount(eventName: string | symbol): number {
        if (this.events.has(eventName)) {
            return (this.events.get(eventName) as Function[]).length;
        } else {
            return 0;
        }
    }

    public addListener(eventName: string | symbol, listener: Function): EventEmitter {
        if (this.events.has(eventName)) {
            const listeners = this.events.get(eventName) as Function[];
            listeners.push(listener);
        } else {
            this.events.set(eventName, [listener]);
        }

        if (this.maxListeners > 0 && this.getListenerCount(eventName) > this.maxListeners) {
            throw new Error(`The maximum amount of listeners should not exceed maxListener: ${this.maxListeners}.`);
        }
        return this;
    }

    public setMaxListeners(num: number): EventEmitter {
        if (num <= 0) {
            throw new Error(`Expected a positive number > 0, and received: ${num}.`);
        }

        this.maxListeners = num;

        return this;
    }

    public listeners(eventName: string | symbol): Function[] {
        if (!this.events.has(eventName)) {
            return [];
        }

        const listeners = this.events.get(eventName) as Function[];

        return listeners;
    }

    public removeAllListeners(eventName?: string | symbol): EventEmitter {
        if (this.events.size <= 0) {
            throw new Error('There are currently no event listeners to remove.');
        }

        if (eventName) {
            if (!this.events.has(eventName.toString())) {
                throw new Error(`Event listener: ${String(eventName)}, was not found.`);
            }

            this.events.delete(eventName);
        }

        this.events.clear();

        return this;
    }
}
