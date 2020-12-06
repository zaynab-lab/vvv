import Link from "next/link";
import TopBar from "../components/TopBar";
import { styles } from "../public/js/styles";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import Image from "../components/Image";
import axios from "axios";
import { atom, useRecoilState } from "recoil";

export const userState = atom({
  key: "user",
  default: {}
});

export default function Menu() {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(userInfo !== {} ? userInfo : "");

  useEffect(() => {
    axios.get("/api/auth").then((res) => {
      const { data } = res;
      setUser("");
      setUserInfo("");
      if (data !== "noToken" && data !== "invalid") {
        setUser(data);
        setUserInfo(data);
      }
    });
  }, [setUser, setUserInfo]);
  return (
    <>
      <TopBar title="الإعدادات" page={true} />
      {loading && <Loader />}
      {!loading && (
        <>
          <div className="menuContainer">
            <div className="menu-header">
              {user ? (
                <>
                  <Image name={"Profile"} />
                  <div className="userName">{user.name}</div>
                </>
              ) : (
                <>
                  <img className="menu-Img" src="/img/png/Profile.png" alt="" />
                  <Link href="/Login">
                    <span onClick={() => setLoading(true)}>تسجيل الدخول</span>
                  </Link>
                </>
              )}
            </div>

            <ul>
              {user && (
                <>
                  <Link href="/details/profile">
                    <li onClick={() => setLoading(true)}>الملف الشخصي</li>
                  </Link>
                  <li className="amount-container">
                    الرصيد <span className="amount">{user.amount}</span>
                    <button
                      className="chargebtn"
                      onClick={() => alert("هذه الخدمة ليست متوفرة حالياً")}
                    >
                      شحن
                    </button>
                  </li>

                  <li>كد خصم</li>

                  <Link href="/details/orders">
                    <li onClick={() => setLoading(true)}>الطلبيات السابقة</li>
                  </Link>
                </>
              )}

              <Link href="/details/customers">
                <li onClick={() => setLoading(true)}>حقوق الزبون</li>
              </Link>

              <Link href="/details/conditions">
                <li onClick={() => setLoading(true)}>شروط الاستخدام</li>
              </Link>

              <Link href="https://wa.me/+96181026095?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C+%D8%A8%D8%AF%D9%8A+%D8%AA%D8%B3%D8%A7%D8%B9%D8%AF%D9%86%D9%8A+%D8%A8%D9%80">
                <li>اتصل بنا</li>
              </Link>
            </ul>
          </div>
        </>
      )}

      <style jsx>{`
        .container {
          overflow: auto;
          height: calc(100vh - 3rem);
        }
        .menu-header {
          color: ${styles.primaryColorLight};
          display: flex;
          flex-direction: column;
          // justify-content: center;
          align-items: center;
          border-bottom: 1px solid ${styles.primaryColor};
        }

        .menu-Img {
          width: 8rem;
          height: 8rem;
          padding: 0.2rem;
          fill: grey;
          opacity: 60%;
        }

        .userName {
          font-size: 1.2rem;
        }

        li {
          padding: 0.5rem;
          border-bottom: 1px solid #eee;
        }

        .amount-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .amount:after {
          margin: auto 0.5rem;
          content: "ل.ل";
        }

        .menuContainer {
          flex: 1 1 40%;
          width: 100vw;
          height: calc(100vh - 3rem);
          border-right: 1px solid ${styles.primaryColorLight};
        }

        .chargebtn {
          background: white;
          border: 1px solid ${styles.primaryColor};
          padding: 0.2rem 0.8rem;
          border-radius: 0.2rem;
        }
      `}</style>
    </>
  );
}
// export async function getServerSideProps() {
//   const res = await fetch("https://localhost:3000/api/auth");
//   const resault = await res.json();
//   return { props: { user: resault.data } };
// }
