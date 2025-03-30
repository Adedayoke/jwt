import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useClickOutside";
import Overlay from "./Overlay";


interface CurrentModalContextType {
  modalName: string;
  close: () => void;
  open: (name: string) => void;
}

const ModalContext = createContext<CurrentModalContextType | null>(
  null
);

function ModalDetails({ children }: { children: React.ReactNode }) {
  const [modalName, setModalName] = useState("");

  const close = () => setModalName("");
  const open = (name: string) => {
    console.log(name)
    setModalName(name)
};

  return (
    <ModalContext.Provider value={{ modalName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}


function ModalWindow({
  children,
  name,
  className,
  buttonClass
}: {
  children: React.ReactElement;
  name: string;
  className?: string;
  buttonClass?: string;
}) {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("ModalWindow must be used within an ModalDetails provider.");
  }

  const { modalName, close } = context;

  // Close modal if clicked outside
  const ref = useOutsideClick<HTMLDivElement>(close);

  if (name !== modalName) return null;

  return createPortal(
    <Overlay>
      <div className={className} ref={ref}>
        <button className={buttonClass} onClick={close}>
          <HiXMark size={20} />
        </button>
        {cloneElement(children, { onCloseModal: close })}
      </div>
    </Overlay>,
    document.body
  );
}


function ModalOpener({
  opensModalName,
  children,
}: {
  opensModalName: string;
  children: React.ReactElement;
}) {
  const context = useContext(ModalContext);


  return cloneElement(children, {
    onClick: () => context?.open(opensModalName)
  });
}

ModalDetails.ModalWindow = ModalWindow;
ModalDetails.ModalOpener = ModalOpener;

export default ModalDetails;
