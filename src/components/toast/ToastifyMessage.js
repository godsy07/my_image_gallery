import { toast } from 'react-toastify';

const ToastifyMessage = ({ type='info', message='Test Message', position='top-right', theme='colored' }) => {
    return toast[type](message, {
        position: position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
        });
}

export default ToastifyMessage
