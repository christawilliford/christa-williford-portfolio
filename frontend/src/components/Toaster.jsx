import React from "react";
import { useToast } from "../hooks/use-toast";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  const getToastIcon = (variant) => {
    switch (variant) {
      case "destructive":
        return <AlertCircle className="h-4 w-4" />;
      case "success":
        return <CheckCircle className="h-4 w-4" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getToastStyles = (variant) => {
    switch (variant) {
      case "destructive":
        return "bg-red-50 border-red-200 text-red-900";
      case "success":
        return "bg-green-50 border-green-200 text-green-900";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-900";
      default:
        return "bg-white border-gray-200 text-gray-900";
    }
  };

  return (
    <div className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map(function (toast) {
        return (
          <div
            key={toast.id}
            className={`group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full ${getToastStyles(toast.variant)}`}
          >
            <div className="flex items-start gap-3">
              {getToastIcon(toast.variant)}
              <div className="grid gap-1">
                {toast.title && (
                  <div className="text-sm font-semibold">
                    {toast.title}
                  </div>
                )}
                {toast.description && (
                  <div className="text-sm opacity-90">
                    {toast.description}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => dismiss(toast.id)}
              className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}