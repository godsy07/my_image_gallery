import React from 'react'
import { useToast } from '../../context/ToastContext'
import { Toast, ToastContainer } from 'react-bootstrap';

const ToastContainerDiv = () => {
    const { toasts, removeToast } = useToast();

    const toastHeaderBgColors = {
        success: "rgb(126, 237, 119)",
        warning: "rgb(242, 220, 73)",
        error: "rgb(250, 110, 95)",
        info: "rgb(95, 250, 242)",
        primary: "rgb(77, 127, 255)",
        secondary: "rgb(201, 201, 201)",
        light: "rgb(255, 255, 255)",
        dark: "rgb(0, 0, 0)",
    }

    const toastBodyBgColors = {
        success: "rgb(126, 237, 119)",
        warning: "rgb(242, 220, 73)",
        error: "rgb(250, 110, 95)",
        info: "rgb(95, 250, 242)",
        primary: "rgb(77, 127, 255)",
        secondary: "rgb(201, 201, 201)",
        light: "rgb(255, 255, 255)",
        dark: "rgb(0, 0, 0)",
    }
    
  return (
    <div className='w-100' style={{ position: "fixed", top: "0", right: "0", backgroundColor: "transparent", zIndex: "2000" }}>
      <ToastContainer position='top-end' className='mt-3'>
        {toasts.map((toast) => (
            <Toast
                key={toast.id}
                onClose={() => removeToast(toast.id)}
            >
                <Toast.Header
                    className='d-flex justify-content-between align-items-center'
                    closeVariant={`${['dark','primary','error'].includes(toast.type)?"white":"black"}`}
                    style={{
                        backgroundColor: toastHeaderBgColors[toast.type] || "white",
                        color: ['dark','primary','error'].includes(toast.type)?"white":"black",
                    }}
                >
                    <strong>{toast.heading}</strong>
                </Toast.Header>
                <Toast.Body
                    style={{
                        backgroundColor: toastBodyBgColors[toast.type] || "white",
                        color: ['dark','primary','error'].includes(toast.type)?"white":"black",
                    }}
                >
                    {toast.message}
                </Toast.Body>
            </Toast>
        ))}
      </ToastContainer>
    </div>
  )
}

export default ToastContainerDiv
