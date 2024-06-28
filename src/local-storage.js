export function LocalStorage(key) {
  const get = () => {
    return JSON.parse(localStorage.getItem(`${key}.current`));
  };
  const set = (value) => {
    localStorage.setItem(`${key}.current`, JSON.stringify(value));
  };
  return {get, set};
}