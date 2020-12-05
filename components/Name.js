import { useState } from "react";
import { atom, useSetRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { phoneState } from "./PhoneOTP";
import { styles } from "../public/js/styles";
import Router from "next/router";

export const userNameState = atom({
  key: "userName",
  default: ""
});

export default function Name() {
  const setUserName = useSetRecoilState(userNameState);
  const phoneNumber = useRecoilValue(phoneState);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const handleClick = () => {
    axios
      .post(
        "/api/auth/SetName",
        { phoneNumber, name },
        { "content-type": "application/json" }
      )
      .then((res) => {
        if (res.data === "done") {
          setUserName(name);
          setMessage(
            "تمت عضويتك بشكل كامل، يمكنك اكمال المعلومات في الملف الشخصي"
          );

          Router.push("/");
        } else {
        }
      });
  };

  return (
    <>
      <div className="message">{message}</div>

      <input
        placeholder="الإسم الكامل"
        className="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        name="phoneNumber"
        type="text"
      />

      <button className="btn" onClick={() => handleClick()}>
        تأكيد
      </button>

      <style jsx>{`
        .message {
          color: ${styles.secondaryColor};
          padding: 0;
          margin: 0;
        }

        .name {
          border: 1px solid lightgrey;
          border-radius: 0.5rem;
          font-size: 1.4rem;
          padding: 0.5rem 0.8rem;
          margin: 0.5rem auto;
        }

        .name:focus {
          outline: none;
          border: 1px solid ${styles.primaryColor};
        }

        .name::placeholder {
          color: lightgrey;
        }

        .btn {
          font-size: 1.2rem;
          border: none;
          background-color: ${styles.primaryColorLight};
          color: white;
          margin: 0.5rem;
          padding: 0.2rem 0.5rem;
          border-radius: 0.2rem;
        }
      `}</style>
    </>
  );
}
