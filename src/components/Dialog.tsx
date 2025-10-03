import { useEffect, useRef } from "react";
import { useOutsideClick } from '../hooks/use-click-outside';

const Dialog = ({ children, open = true, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dialogRef, () => {
    onClose?.();
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-[99]
        flex items-center justify-center
        bg-black/40
        p-4
      "
    >
      <div
        ref={dialogRef}
        className="
          w-full max-w-md
          bg-white border border-gray-200
          rounded-md p-4
        "
      >
        {children}
      </div>
    </div>
  );
};

export default Dialog;
