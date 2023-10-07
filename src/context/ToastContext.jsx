// ToastContext.js
import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  // const [toasts, setToasts] = useState([
  //   { id: 1, message: "This is test message 1", type: 'success', heading: "Success" },
  //   { id: 2, message: "This is test message 2", type: 'error', heading: "Error" },
  //   { id: 3, message: "This is test message 2", type: 'warning', heading: "Warning" },
  //   { id: 4, message: "This is test message 2", type: 'info', heading: "Info" },
  //   { id: 5, message: "This is test message 2", type: 'primary', heading: "Primary" },
  //   { id: 6, message: "This is test message 2", type: 'secondary', heading: "Secondary" },
  //   { id: 7, message: "This is test message 2", type: 'light', heading: "Light" },
  //   { id: 8, message: "This is test message 2", type: 'dark', heading: "Dark" },
  // ]);

  const addToast = ({ message, type, delay=3000 }) => {
    const newToast = { id: Date.now(), message, type };
    setToasts((prevToasts) => [...prevToasts, newToast]);

    setTimeout(() => removeToast(addToast.id), delay);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

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
