// ToastContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = ({ message, heading, type, duration=3000 }) => {
    const newToast = { id: Date.now(), heading, message, type, duration, createdTime: Date.now() };
    setToasts((prevToasts) => [ newToast, ...prevToasts ]);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    let toastCleanupInterval;
    if (toasts.length > 0) {
      // Periodically check and remove old toasts
      toastCleanupInterval = setInterval(() => {
        const currentTime = Date.now();
        const updatedToasts = toasts.filter(
          (toast) => currentTime - toast.createdTime <= toast.duration
        );
        setToasts(updatedToasts);
      }, 10); // Check every 10 microsecond
    }

    return () => clearInterval(toastCleanupInterval);
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};

// export { ToastProvider, useToast };
