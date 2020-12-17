import { useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import { styles } from "../../public/js/styles";
import Orders from "../../components/Orders";
import axios from "axios";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function OrdersPage() {
  const [current, setCurrent] = useState(true);
  const [orderList, setOrderList] = useState([]);
  const [currentList, setCurrentList] = useState([]);

  useEffect(() => {
    axios.get("/api/orders/user").then((res) => {
      const { data } = res;
      if (data !== "invalid" && data !== "noToken") {
        setOrderList(data);
      }
    });
  }, [setOrderList]);

  return (
    <>
      <TopBar title="الطلبيات" page={false} />
      <div className="container">
        <div className="topBar">
          <div
            className={`topBar-item ${current && "current"}`}
            onClick={() => {
              setCurrent(true);
            }}
          >
            الحالية
          </div>
          <div
            className={`topBar-item ${!current && "current"}`}
            onClick={() => {
              setCurrent(false);
            }}
          >
            السابقة
          </div>
        </div>
        <Orders current={current} orderList={orderList} />
        <div className="contactUs">
          <div>في حال وجود أي مشكلة</div>
          <Link href="https://wa.me/+96181026095?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C">
            <div className="contactbtn">
              <FaWhatsapp /> <span>تواصل معنا</span>
            </div>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .topBar {
          display: flex;
          width: 100%;
          overflow: auto;
          border-bottom: 1px solid ${styles.primaryColor};
        }

        .container {
          height: calc(100vh - 3rem);

          overflow: auto;
        }

        .topBar-item {
          text-align: center;
          padding: 0.2rem 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .current {
          color: ${styles.secondaryColor};
          font-size: 1.4rem;
          flex: 1 1 100%;
        }
        .contactUs {
          color: ${styles.secondaryColor};
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 1rem 0;
        }

        .contactbtn {
          background: ${styles.primaryColorLight};
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 0.5rem;
        }
      `}</style>
    </>
  );
}
