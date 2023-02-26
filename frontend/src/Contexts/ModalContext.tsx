import { createContext, ReactNode, useContext, useState } from "react";
import { DeviceContextType } from "../@types/device";
import { ModalContextType } from "../@types/modal";
import { DeviceContext } from "./DeviceContext";

export const ModalContext = createContext<ModalContextType | null>(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }

  return context;
};

interface Props {
  children: ReactNode;
}

export function ModalProvider({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const { setId } = useContext(DeviceContext) as DeviceContextType;

  const handleClickOpen = (titleModal: string, id?: string) => {
    setId(id);
    setTitle(titleModal);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const contextValues: ModalContextType = {
    open,
    title,
    handleClickOpen,
    handleClose,
  };

  return (
    <ModalContext.Provider value={contextValues}>
      {children}
    </ModalContext.Provider>
  );
}
