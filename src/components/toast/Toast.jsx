import { useEffect } from "react";
import { useToastContext } from "../../context";
import "./toast.css";

const Toast = () => {
  // from toast context
  const {
    toastState: { toastList },
    toastDispatch,
  } = useToastContext();

  useEffect(() => {
    const intervalId = setTimeout(() => {
      if (toastList.length) {
        toastDispatch({
          type: "REMOVE_TOAST",
          payload: [...toastList].filter(
            (toast) => toastList[0].id !== toast.id
          ),
        });
      }
    }, 1500);
    return () => {
      clearInterval(intervalId);
    };
  }, [toastList, toastDispatch]);

  return (
    <div className="toast-container">
      {toastList.length > 0 &&
        toastList.map((currToast) => (
          <div key={currToast.id} className={`toast ${currToast.className}`}>
            <i
              className="fa-solid fa-circle-xmark toast-icon cursor"
              onClick={() =>
                toastDispatch({
                  type: "REMOVE_TOAST",
                  payload: [...toastList].filter(
                    (toast) => toast.id !== currToast.id
                  ),
                })
              }
            ></i>
            <span className="text-xl toast-flex">{currToast.message}</span>
          </div>
        ))}
    </div>
  );
};

export { Toast };
