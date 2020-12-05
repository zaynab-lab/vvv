import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import { styles } from "../public/js/styles";
import Link from "next/link";
import Router from "next/router";
import axios from "axios";

export default function Proceed() {
  const [route, setRoute] = useState(true);

  useEffect(() => {
    axios.get("/api/auth").then((res) => {
      if (res.data === "noToken" || res.data === "invalid") {
        Router.push("/Login");
      } else {
        setRoute(false);
      }
    });
  }, []);

  return (
    <>
      {route ? (
        <div></div>
      ) : (
        <>
          <TopBar title="المرحلة النهائية" page={true} cart={false} />

          <div className="container">
            <label>اختر العنوان</label>

            <select className="select">
              <option>العنوان الأول: </option>
            </select>

            <label>اختر طريقة الدفع</label>

            <select className="select">
              <option>عند الإستلام</option>

              <option>بطاقة الائتمان</option>

              <option disabled>عبر الإنترنت</option>
            </select>

            <Link href="/">
              <button className="confirmbtn">الموافقة النهائية</button>
            </Link>
          </div>
        </>
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

          padding: 1.5rem;

          font-size: 1.2rem;
        }

        .select {
          border-radius: 0.5rem;

          font-size: 1.2rem;

          padding: 0.2rem 0.8rem;

          background: white;

          margin-right: 0.4rem;

          width: 80%;
        }

        .select:focus {
          border: 1px solid ${styles.primaryColor};
        }

        label {
          width: 80%;

          margin-top: 1rem;
        }

        .confirmbtn {
          font-size: 1.2rem;

          border: none;

          background-color: ${styles.primaryColorLight};

          color: white;

          margin: 0.5rem;

          padding: 0.2rem 0.8rem;

          border-radius: 0.2rem;

          margin-top: 1.5rem;
        }
      `}</style>
    </>
  );
}
