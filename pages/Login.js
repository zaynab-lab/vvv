import { useState, useEffect } from "react";
import PhoneOTP from "../components/PhoneOTP";
import { atom, useRecoilValue } from "recoil";
import Name from "../components/Name";
import TopBar from "../components/TopBar";
import axios from "axios";
import Router from "next/router";
import Loader from "../components/Loader";

export const PhonePageState = atom({
  key: "phonePage",
  default: true
});

export default function Login() {
  const phonePage = useRecoilValue(PhonePageState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/auth").then((res) => {
      const { data } = res;
      if (data !== "noToken" && data !== "invalid") {
        Router.push("/");
      } else {
        setLoading(false);
      }
    });
  }, []);

  return (
    <>
      <TopBar title="تسجيل الدخول" page={true} />
      {loading && <Loader />}
      {!loading && (
        <div className="container">{phonePage ? <PhoneOTP /> : <Name />}</div>
      )}
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          font-weight: 800;
          box-sizing: border-box;
          text-decoration: unset;
          outline: none;
          -webkit-user-select: none;
          -webkit-tap-highlight-color: transparent;
          direction: rtl;
          overscroll-behavior: contain;
        }
      `}</style>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 70vh;
        }
      `}</style>
    </>
  );
}
