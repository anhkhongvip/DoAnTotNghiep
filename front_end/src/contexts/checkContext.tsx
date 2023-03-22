import { createContext, useContext, useState } from "react";
import {CheckContextType} from "../@types/check"
const CheckContext = createContext<CheckContextType | null>(null);
function CheckProvider(props: any) {
  const [check, setCheck] = useState<boolean>(false);
  const value = { check, setCheck };
  return (
    <CheckContext.Provider value={value} {...props}></CheckContext.Provider>
  );
}

function useCheck() {
  const context = useContext(CheckContext);
  if (typeof context === "undefined")
    throw new Error("useCheck must be used within a CheckContext");
  return context;
}

export { CheckProvider, useCheck };
