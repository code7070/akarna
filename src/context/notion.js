import { createContext, useContext, useState } from "react";

const Context = createContext();

export function NotionProvider({ children }) {
  const [notion, setNotion] = useState(false);
  return (
    <Context.Provider value={[notion, setNotion]}>{children}</Context.Provider>
  );
}

export function useNotionProvider() {
  return useContext(Context);
}
