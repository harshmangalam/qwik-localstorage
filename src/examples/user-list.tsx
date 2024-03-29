import { component$, useSignal } from "@builder.io/qwik";
import { useLocalStorage } from "../use-localstorage";

export default component$(() => {
  const input = useSignal("");

  const { data, set, remove } = useLocalStorage<string[]>("users");

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
