import React, { useEffect } from 'react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onRemove: (id: string) => void }> = ({
  toast,
  onRemove,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const bgStyles = {
    info: 'bg-[#0f1f38] text-white border-[#7887a5]',
    success: 'bg-[#002114] text-white border-emerald-500',
    warning: 'bg-[#3e2c00] text-amber-100 border-amber-500',
    error: 'bg-[#93000a] text-white border-rose-400',
  }[toast.type];

  const iconName = {
    info: 'info',
    success: 'check_circle',
    warning: 'warning',
    error: 'error',
  }[toast.type];

  return (
    <div
      className={`pointer-events-auto p-3 rounded-sm border shadow-xl flex items-start gap-3 animate-toast ${bgStyles}`}
    >
      <span className="material-symbols-outlined text-[20px] flex-shrink-0 mt-0.5">
        {iconName}
      </span>
      <div className="flex-1 text-xs">
        <div className="font-bold">{toast.title}</div>
        {toast.description && (
          <div className="text-[11px] opacity-90 mt-0.5 leading-snug">{toast.description}</div>
        )}
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="opacity-70 hover:opacity-100 p-0.5"
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
};
