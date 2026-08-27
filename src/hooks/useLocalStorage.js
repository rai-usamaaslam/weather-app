import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);

    if (storedValue) {
      return JSON.parse(storedValue);
    }

    return initialValue;
  });

  function updateValue(newValue) {
    setValue((previousValue) => {
      const updatedValue =
        typeof newValue === "function"
          ? newValue(previousValue)
          : newValue;

      localStorage.setItem(
        key,
        JSON.stringify(updatedValue)
      );

      return updatedValue;
    });
  }

  return [value, updateValue];
}

export default useLocalStorage;