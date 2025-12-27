type MaybePromise<T> = T | Promise<T>;

export default class MessageHandler<
  E extends Record<string, object> = Record<string, object>,
> {
  private events: {
    [K in keyof E]?: [
      handler: (data: E[K]) => MaybePromise<void>,
      once: boolean,
    ][];
  } = {};

  constructor(public ctx: Worker | typeof globalThis) {
    (ctx as Worker).addEventListener("message", this.handleMessage.bind(this));
  }

  private handleMessage({
    data: [eventName, data],
  }: MessageEvent<[keyof E, E[keyof E]]>) {
    const handlers = this.events[eventName];
    if (!handlers) return;

    handlers.forEach(([handler]) => handler(data));
    this.events[eventName] = handlers.filter(([, once]) => !once);
  }

  on<K extends keyof E>(
    eventName: K,
    handler: (data: E[K]) => MaybePromise<void>,
  ): void {
    this.events[eventName] ??= [];
    this.events[eventName].push([handler, false]);
  }

  once<K extends keyof E>(
    eventName: K,
    handler: (data: E[K]) => MaybePromise<void>,
  ): void {
    this.events[eventName] ??= [];
    this.events[eventName].push([handler, true]);
  }

  emit<K extends keyof E>(eventName: K, data: E[K]) {
    this.ctx.postMessage([eventName, data]);
  }
}
