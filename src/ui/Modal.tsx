import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose?: () => void;
  className?: string;
}
export default function Modal({
  children,
  open,
  onClose,
  className = "",
}: ModalProps) {
  const dialog = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const modal = dialog.current;

    if (!modal) return;
    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  const modalRoot = document.getElementById("modal");
  if (!modalRoot) return null;

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    modalRoot
  );
}
