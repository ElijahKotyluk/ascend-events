export interface Listener {
    fn: Function;
    once: boolean;
}

export default class EventEmitter {
    public maxListeners: number;
    public events: Map<string | symbol, Listener[]>;

    constructor() {
        this.events = new Map();
        this.maxListeners = 10;
    }

    private _addListener(
            eventName: string | symbol,
            listener: Function,
            once: boolean,
        ): EventEmitter {

        if (this.events.has(eventName)) {
            const listeners = this.events.get(eventName) as Listener[];
            listeners.push({ fn: listener, once: false});
        } else {
            this.events.set(eventName, [{ fn: listener, once: false }]);
        }

        if (
            this.maxListeners > 0 &&
            this.getListenerCount(eventName) > this.maxListeners
        ) {
            throw new Error(
            `The maximum amount of listeners should not exceed maxListener: ${this.maxListeners}.`,
            );
        }

        return this;
    }

    public addListener(eventName: string | symbol, listener: Function): EventEmitter {
        return this._addListener(eventName, listener, false);
    }

    public emit(eventName: string | symbol, ...args: any[]): EventEmitter {
        if (this.events.has(eventName)) {
            const listeners = this.events.get(eventName) as Listener[];

            for (const listener of listeners) {
                try {
                    listener.fn.apply(this, args);

                    if (listener.once) {
                        this.removeListener(eventName, listener.fn);
                    }
                } catch (err) {
                    throw err;
                }
            }
        }

        return this;
    }

    public getListenerCount(eventName: string | symbol): number {
        if (this.events.has(eventName)) {
            return (this.events.get(eventName) as Listener[]).length;
        } else {
            return 0;
        }
    }

    public setMaxListeners(num: number): EventEmitter {
        if (num <= 0) {
            throw new Error(`Expected a positive number > 0, and received: ${num}.`);
        }

        this.maxListeners = num;

        return this;
    }

    public listeners(eventName: string | symbol): Listener[] {
        if (!this.events.has(eventName)) {
            return [];
        }

        const listeners = this.events.get(eventName) as Listener[];

        return listeners;
    }

    public on(eventName: string | symbol, listener: Function): EventEmitter {
        this._addListener(eventName, listener, false);

        return this;
    }

    public once(eventName: string | symbol, listener: Function): EventEmitter {
        return this._addListener(eventName, listener, true);
    }

    public prependListener(eventName: string | symbol, listener: Function): EventEmitter {
        if (this.events.has(eventName)) {
            const listeners = this.events.get(eventName) as Listener[];

            listeners.unshift({ fn: listener, once: false });
        } else {
            this.events.set(eventName, [{ fn: listener, once: false }]);
        }

        return this;
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

    /**
     * @TODO
     * 1) Find better way to compare functions
     * 2) maybe use `indexOf` instead of `for of`?
     * @param {string | symbol} eventName
     * @param {Function} listener
     * @returns {EventEmitter}
     */
    public removeListener(eventName: string | symbol, listener: Function): EventEmitter {
        if (!this.events.has(eventName.toString())) {
            throw new Error(`Event listener: ${String(eventName)}, was not found.`);
        }

        const events = this.events.get(eventName) as Listener[];

        for (const event of events) {
            if (event.fn.toString() === listener.toString()) {
                this.events.delete(eventName);
            }
        }
        return this;
    }
}
