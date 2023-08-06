export const debouncedPromise = <T extends (...args: unknown[]) => unknown>(
  fn: T,
  wait: number,
  abortValue: unknown = undefined,
) => {
  let cancel = () => {};
  return (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    cancel();
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const timer = setTimeout(() => resolve(fn(...args)), wait);
      cancel = () => {
        clearTimeout(timer);
        if (abortValue !== undefined) {
          reject(abortValue);
        }
      };
    });
  };
};
