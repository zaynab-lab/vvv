import { useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import { styles } from "../../public/js/styles";
import Orders from "../../components/Orders";
import axios from "axios";

export default function OrdersPage() {
  const [current, setCurrent] = useState(true);
  const [orderList, setOrderList] = useState([]);

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
      <TopBar title="الطلبيات" page={true} />
      <div className="container">
        <div className="topBar">
          <div
            className={`topBar-item ${current && "current"}`}
            onClick={() => setCurrent(true)}
          >
            الحالية
          </div>

          <div
            className={`topBar-item ${!current && "current"}`}
            onClick={() => setCurrent(false)}
          >
            السابقة
          </div>
        </div>

        <Orders current={current} orderList={orderList} />
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
      `}</style>
    </>
  );
}
