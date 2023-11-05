import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useToast } from '../../context/ToastContext'

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

    const toastVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, x: -100 },
      };
    
  return (
    <div className='w-100' style={{ position: "fixed", top: "0", right: "0", backgroundColor: "transparent", zIndex: "2000" }}>
      <ToastContainer position='top-end' className='mt-3'>
          <AnimatePresence>
            {toasts.map((toast) => (
                <motion.div key={toast.id} variants={toastVariants} initial='hidden' animate='visible' exit='exit'>
                    <Toast
                        onClose={() => removeToast(toast.id)}
                        className='m-0 mb-2'
                    >
                        <Toast.Header
                            className='d-flex justify-content-between align-items-center'
                            style={{
                                backgroundColor: toastHeaderBgColors[toast.type] || "white",
                                color: ['dark','primary','error'].includes(toast.type)?"white":"black",
                            }}
                        >
                            <strong>{toast.heading?toast.heading:toast.type}</strong>
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
                </motion.div>
            ))}
        </AnimatePresence>
      </ToastContainer>
    </div>
  )
}

export default ToastContainerDiv
