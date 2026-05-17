import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "SUCCESS";

  return (
    <div
      className={`
        fixed bottom-5 right-5 z-[9999]
        min-w-[280px] max-w-md
        rounded-xl px-4 py-3 shadow-lg
        flex items-start justify-between gap-3
        text-white
        animate-fade-in
        ${isSuccess ? "bg-green-600" : "bg-red-600"}
      `}
    >
      <div className="flex flex-col">
        <span className="font-semibold text-sm">
          {isSuccess ? "Success" : "Error"}
        </span>
        <span className="text-sm opacity-90">{message}</span>
      </div>

      <button
        onClick={onClose}
        className="text-white/80 hover:text-white text-lg leading-none"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;