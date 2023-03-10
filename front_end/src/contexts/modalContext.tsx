import { createContext, useContext, useState } from "react";
import {ModalContextType} from "../@types/modal"
const ModalContext = createContext<ModalContextType | null>(null);
function ModalProvider(props: any) {
  const [modalOpen, setModalOpen] = useState<string>("");
  const value = { modalOpen, setModalOpen };
  return (
    <ModalContext.Provider value={value} {...props}></ModalContext.Provider>
  );
}

function useModal() {
  const context = useContext(ModalContext);
  if (typeof context === "undefined")
    throw new Error("useToggleModal must be used within a ToggleModalContext");
  return context;
}

export { ModalProvider, useModal };
