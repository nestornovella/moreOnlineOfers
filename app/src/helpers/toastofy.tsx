import { toast, Bounce, ToastOptions } from 'react-toastify';

type TypeIF = 'success' | 'error' | 'info' | 'warning' | 'loading';
type TimeIf = 2000 | 3000 | 4000 | 5000 

const defaultToastOptions: ToastOptions = {
  position: "bottom-left",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Bounce,
};

export function getToast(type: TypeIF, message: string = "", time:TimeIf) {
  const toastTypes = {
    success: toast.success,
    error: toast.error,
    warning: toast.warning,
    info: toast.info,
    loading: toast.loading
  };

  const showToast = toastTypes[type] ?? toast.success;
  showToast(message, !time ? defaultToastOptions: {...defaultToastOptions, autoClose:time});
}
