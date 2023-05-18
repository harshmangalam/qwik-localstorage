import { $, useOnWindow, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const data = useSignal<T | null>(null);

  const set = $((payload: T) => {
    const stringifiedData = JSON.stringify(payload);
    window.localStorage.setItem(key, stringifiedData);
    data.value = payload;
  });

  const remove = $((key: string) => {
    window.localStorage.removeItem(key);
    data.value = null;
  });

  const handleLocalStorage = $((e: Event) => {
    const { key: storageKey, newValue, storageArea } = e as StorageEvent;

    if (storageArea === window.localStorage) {
      if (key === storageKey) {
        const newVal = newValue ? JSON.parse(newValue) : null;
        data.value = newVal as T;
      }
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => key);
    const currentData = window.localStorage.getItem(key);

    if (
      (!currentData ||
        typeof currentData === "undefined" ||
        typeof currentData === null) &&
      defaultValue
    ) {
      set(defaultValue);
    }

    if (
      currentData &&
      typeof currentData !== "undefined" &&
      typeof currentData !== null
    ) {
      const parsedData = JSON.parse(currentData);
      if (parsedData) {
        data.value = parsedData as T;
      }
    }
  });

  useOnWindow("storage", handleLocalStorage);

  return {
    data,
    set,
    remove,
  };
}
