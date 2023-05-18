# Qwik Localstorage hook ⚡️

---

## Install

```sh
npm i qwik-localstorage
```

```sh
pnpm i qwik-localstorage
```

```sh
yarn add qwik-localstorage
```

## Usage

```js

import { component$, useSignal } from "@builder.io/qwik";
import { useLocalStorage } from "qwik-localstorage";

export default component$(() => {
  const input = useSignal("");

  const { data, set, remove } = useLocalStorage<string[]>("users", []);

  return (
    <div>
      <input bind:value={input} type="text" placeholder="Enter username" />
      <button
        onClick$={() => {
          set(
            Array.isArray(data.value)
              ? [...data.value, input.value]
              : [input.value]
          );
          input.value = "";
        }}
      >
        Add User
      </button>

      <ul>
        {data.value?.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
      <button onClick$={() => remove("users")}>Clear</button>
    </div>
  );
});


```
