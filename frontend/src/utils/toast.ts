import { toast } from "react-toastify";

export default function toastMessage(
  message: string,
  type: "success" | "error" | "info" | "warn"
) {
  toast[type](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}
