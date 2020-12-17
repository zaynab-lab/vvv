import { useState } from "react";
import { atom, useSetRecoilState } from "recoil";
import axios from "axios";
import { PhonePageState } from "../pages/Login";
import { styles } from "../public/js/styles";
import Router from "next/router";

export const phoneState = atom({
  key: "phone",
  default: ""
});

export default function PhoneOTP({ routeTo }) {
  const [waiting, setWaiting] = useState(false);
  const setphone = useSetRecoilState(phoneState);
  const setPhonePage = useSetRecoilState(PhonePageState);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oTP, setOTP] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage("");
    if (phoneNumber === "") {
      e.target.value !== "0" && setPhoneNumber(e.target.value);
      e.target.value === "0" && setMessage("ابدء الرقم بدون صفر");
    } else {
      setPhoneNumber(e.target.value);
    }
    phoneNumber.length >= 8 && setMessage("الرجاء التأكد من الرقم");
  };

  const handleClick = () => {
    setMessage("");
    waiting
      ? axios
          .post(
            "/api/auth/Login",
            { phoneNumber, oTP },
            { "content-type": "application/json" }
          )
          .then((res) => {
            res.data === "done" && setPhonePage(false);
            routeTo
              ? res.data === "exist" &&
                Router.push(
                  "/cart?msg=%D9%8A%D9%85%D9%83%D9%86%D9%83%20%D8%A7%D8%AA%D9%85%D8%A7%D9%85%20%D8%B9%D9%85%D9%84%D9%8A%D8%A9%20%D8%A7%D9%84%D8%B4%D8%B1%D8%A7%D8%A1"
                ) &&
                setMessage("تم تسجيل الدخول بنجاح")
              : res.data === "exist" &&
                Router.push(
                  "/?msg=%D8%AA%D9%85%20%D8%AA%D8%B3%D8%AC%D9%8A%D9%84%20%D8%AF%D8%AE%D9%88%D9%84%D9%83%20%D8%A8%D9%86%D8%AC%D8%A7%D8%AD"
                ) &&
                setMessage("تم تسجيل الدخول بنجاح");

            res.data !== "done" && res.data !== "exist" && setMessage(res.data);
          })
      : axios
          .post(
            "/api/auth/Sign",
            { phoneNumber },
            { "content-type": "application/json" }
          )
          .then((res) => {
            res.data === "done" && setWaiting(true);
            res.data === "done" && setphone(phoneNumber);
            res.data !== "done" && setMessage(res.data);
          });
  };

  return (
    <>
      <div className="message">{message}</div>

      <div className="phoneContainer">
        <select className="countryCode">
          <option>961+</option>

          <option>1+</option>
        </select>

        <input
          placeholder="أدخل رقمك الخليوي"
          className="phone"
          onChange={(e) => handleChange(e)}
          value={phoneNumber}
          name="phoneNumber"
          type="number"
          disabled={waiting}
          autoComplete="off"
        />
      </div>

      {waiting && (
        <input
          placeholder="أدخل الرمز المؤقت، يرجى الانتظار"
          className="phone otp"
          value={oTP}
          onChange={(e) => setOTP(e.target.value)}
          type="number"
        />
      )}

      <button className="btn" onClick={() => handleClick()}>
        {waiting ? "تسجيل الدخول" : "طلب الرمز المؤقت"}
      </button>

      <style jsx>{`
        .message {
          color: ${styles.secondaryColor};
          padding: 0;
          margin: 0;
        }

        .phoneContainer {
          display: flex;
          flex-direction: row-reverse;
          margin: 0.8rem auto;
          max-width: 100vw;
        }

        .countryCode {
          border-radius: 0.5rem;
          font-size: 1.2rem;
          padding: 0.5rem 0.8rem;
          background: white;
          margin-right: 0.4rem;
          width: 6rem;
        }

        .countryCode:focus {
          border: 1px solid ${styles.primaryColor};
        }

        .phone {
          border: 1px solid lightgrey;
          border-radius: 0.5rem;
          font-size: 1.4rem;
          padding: 0.5rem 0.8rem;
          max-width: 13rem;
        }

        .phone:focus {
          outline: none;
          border: 1px solid ${styles.primaryColor};
        }

        .phone::placeholder {
          color: lightgrey;
          font-size: 1.2rem;
        }

        .otp {
          margin-bottom: 0.8rem;
          min-width: 19rem;
        }

        .btn {
          font-size: 1.2rem;
          border: none;
          background-color: ${styles.primaryColorLight};
          color: white;
          margin: 0.5rem;
          padding: 0.2rem 0.8rem;
          border-radius: 0.2rem;
        }
      `}</style>
    </>
  );
}
