import { useState, useEffect } from "react";
import { styles } from "../../public/js/styles";
import axios from "axios";
import OrderEnd from "../../components/OrderEnd";
import ArrowBar from "../ArrowBar";
import { FaCalendarAlt, FaMapMarkedAlt } from "react-icons/fa";
import OrderControllBar from "./components/OrderControllBar";

const OrderItem = ({ order }) => {
  const [hidden, setHidden] = useState(true);

  return (
    <>
      <div className="orderContainer">
        <div className="header" onClick={() => setHidden(!hidden)}>
          <div>
            <FaCalendarAlt /> تاريخ الطلب: {order.date}
          </div>
          <div className="totalbar">
            <span>الإجمالي: {order.total} ل.ل</span>{" "}
            <span>رقم الطلب: {order.orderCode}</span>
          </div>

          <div>
            <FaMapMarkedAlt /> العنوان: {order.address}
          </div>
          <div className="totalbar">
            <span>اسم الزبون: {order.userName}</span>
            <span>الرقم: {order.number}</span>
          </div>
        </div>

        {!hidden && <OrderEnd proceedProducts={order.products} />}
        <OrderControllBar />
        <div className="footer">
          <span>المراحل : </span>
          <div>
            <ArrowBar />
          </div>
        </div>
      </div>
      <style jsx>{`
        .orderContainer {
          margin: 1rem;
          border: 1px solid ${styles.primaryColor};
          border-radius: 0.5rem;
        }

        .header,
        .footer {
          padding: 0.5rem;
          background: ${styles.thirdColor};
          color: ${styles.primaryColor};
          border-radius: 0.5rem;
        }

        .footer {
          display: flex;
          align-items: center;
          overflow: auto;
          width: 100%;
        }

        .footer div {
          flex: 1 0 46rem;
        }

        .footer span {
          flex: 1 0 5rem;
        }

        .totalbar {
          display: flex;
        }

        .totalbar span {
          flex: 1 1 100%;
        }
      `}</style>
    </>
  );
};

export default function OrdersPage() {
  const [roles, setRoles] = useState("");
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    axios.get("/api/auth").then((res) => {
      const { data } = res;
      if (data !== "noToken" && data !== "invalid") {
        setRoles(data.roles);
      }
    });
    axios.get("/api/orders").then((res) => {
      const { data } = res;
      data && setOrderList(data);
    });
  }, [setRoles, setOrderList]);

  return (
    <>
      {roles.includes("ordersManager") && (
        <div>
          {orderList.map((obj) => (
            <OrderItem order={obj} />
          ))}
        </div>
      )}
    </>
  );
}
