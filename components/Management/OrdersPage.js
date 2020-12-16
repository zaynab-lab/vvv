import { useState, useEffect } from "react";
import { styles } from "../../public/js/styles";
import axios from "axios";
import OrderItem from "./components/OrderItem";
import {
  FaCheckCircle,
  FaSearchPlus,
  FaShoppingBag,
  FaSmileWink,
  FaTimesCircle,
  FaTruck
} from "react-icons/fa";

export default function OrdersPage() {
  const [roles, setRoles] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [current, setCurrent] = useState("record");

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
      <div className="orderTopBar">
        <div className="step">
          <span className="icon">
            <FaCheckCircle />
          </span>

          <span>تسجيل الطلبية</span>
        </div>

        <div className="step">
          <span className="icon">
            <FaShoppingBag />
          </span>

          <span>تحضير الطلبية</span>
        </div>

        <div className="step">
          <span className="icon">
            <FaSearchPlus />
          </span>

          <span>تدقيق الطلبية</span>
        </div>

        <div className="step">
          <span className="icon">
            <FaTruck />
          </span>
          <span>تم إرسالها</span>
        </div>

        <div className="step">
          <span className="icon">
            <FaSmileWink />
          </span>
          <span>تم تسليمها</span>
        </div>
        <div className="step">
          <span className="icon">
            <FaTimesCircle />
          </span>

          <span>ملغاة</span>
        </div>
      </div>
      {roles.includes("ordersManager") && (
        <div>
          {orderList.map((obj) => (
            <OrderItem order={obj} />
          ))}
        </div>
      )}
      <style jsx>{`
        .orderTopBar {
          display: flex;
          max-width: 100%;
          overflow: auto;
          padding: 0.5rem;
          border-bottom: 1px solid ${styles.primaryColor};
        }

        .step {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1 0 10rem;
        }
        .icon {
          margin: 0 0.5rem;
        }
      `}</style>
    </>
  );
}
