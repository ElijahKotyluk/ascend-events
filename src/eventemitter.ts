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
        prepend: boolean,
    ): EventEmitter {
        this.emit('newListener', eventName, listener);

        if (this.events.has(eventName)) {
            const listeners = this.events.get(eventName) as Listener[];

            if (prepend) {
                listeners.unshift({ fn: listener, once});
            }

            listeners.push({ fn: listener, once});
        } else {
            this.events.set(eventName, [{ fn: listener, once }]);
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
        return this._addListener(eventName, listener, false, false);
    }

    public emit(eventName: string | symbol, ...args: any[]): boolean {
        if (this.events.has(eventName)) {
            const listeners = this.events.get(eventName)!.slice() as Listener[];

            for (const listener of listeners) {
                try {
                    listener.fn.apply(this, args);

                    if (listener.once) {
                        this.removeListener(eventName, listener.fn);
                    }
                } catch (err) {
                    this.emit('error', err);
                }
            }

            return true;
        } else if (eventName === 'error') {
            const error = args.length > 0 ? args[0] : Error('Unhandled error.');
            throw error;
        }

        return false;
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

    public off(eventName: string | symbol, listener: Function): EventEmitter {
        this.removeListener(eventName, listener);

        return this;
    }

    public on(eventName: string | symbol, listener: Function): EventEmitter {
        this._addListener(eventName, listener, false, false);

        return this;
    }

    public once(eventName: string | symbol, listener: Function): EventEmitter {
        return this._addListener(eventName, listener, true, false);
    }

    public prependListener(eventName: string | symbol, listener: Function): EventEmitter {
        return this._addListener(eventName, listener, false, true);
    }

    public prependOnceListener(eventName: string | symbol, listener: Function): EventEmitter {
        return this._addListener(eventName, listener, true, true);
    }

    public removeAllListeners(eventName?: string | symbol): EventEmitter {
        if (this.events.size <= 0) {
            throw new Error('There are currently no event listeners to remove.');
        }

        if (eventName) {
            if (!this.events.has(eventName)) {
                throw new Error(`Event listener: ${String(eventName)}, was not found.`);
            }

            const listeners = this.events.get(eventName)!.slice();
            this.events.delete(eventName);

            for (const listener in listeners) {
                this.emit('removeListener', eventName, listener);
            }
        } else {
            this.events.clear();
        }

        return this;
    }

    public removeListener(eventName: string | symbol, listener: Function): EventEmitter {
        if (!this.events.has(eventName)) {
            throw new Error(`Event listener: ${String(eventName)}, was not found.`);
        }

        const events = this.events.get(eventName) as Listener[];

        for (const event of events) {
            if (event.fn.toString() === listener.toString()) {

                const arr = events.filter((v) => v.fn.toString() !== listener.toString());
                this.emit('removeListener', eventName, listener);

                if (arr.length === 0) {
                    this.events.delete(eventName);
                } else {
                    this.events.set(eventName, arr);
                }
            }
        }

        return this;
    }
}
