export class Localstorage {
  set = <TData>(key: string, data: TData) => {
    window.localStorage.setItem(key, JSON.stringify(data));
  };
  get = <TData>(key: string): TData | null => {
    const item = window.localStorage.getItem(key);
    if (!item) return null;
    return JSON.parse(item) as TData;
  };
}

const localstorage = new Localstorage();

export default localstorage;
