import { useEffect } from "react";
import { styles } from "../public/js/styles";
import { atom, useSetRecoilState } from "recoil";

export const toastState = atom({
  key: "toastActivate",
  value: false
});

export default function Toast() {
  const [toast, setToast] = useSetRecoilState(toastState);

  useEffect(() => {
    if (toast) {
      setToast(true);
      setTimeout(setToast(false), 3000);
    }
    console.log("one");
  }, [toast]);
  return (
    <>
      <div className="toast">
        <span>hiii</span>
      </div>
      <style jsx>{`
        .toast {
          width: fit-content;
          display: ${toast ? "absolute" : "none"};
          bottom: 5rem;
          height: 2rem;
          padding: 0.5rem;
          border-radius: 0.5rem;
          color: white;
          opacity: 80%;
          background: ${done ? styles.secondaryColor : "red"};
        }
      `}</style>
    </>
  );
}
