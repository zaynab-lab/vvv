import { useState, useEffect } from "react";
import { styles } from "../../public/js/styles";
import axios from "axios";
import OrderEnd from "../../components/OrderEnd";
import ArrowBar from "../ArrowBar";
import { FaCalendarAlt, FaMapMarkedAlt } from "react-icons/fa";

export default function CustomersPage() {
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
            <div className="orderContainer">
              <div className="header">
                <div>
                  <FaCalendarAlt /> تاريخ الطلب: {obj.date}
                </div>

                <div className="totalbar">
                  <span>الإجمالي: {obj.total} ل.ل</span>{" "}
                  <span>رقم الطلب: {obj.orderCode}</span>
                </div>
                <div>
                  <FaMapMarkedAlt /> العنوان: {obj.address}
                </div>
                <div>اسم الزبون: {obj.userName}</div>
              </div>

              <OrderEnd proceedProducts={obj.products} />

              <div className="footer">
                <span>المراحل : </span>

                <div>
                  <ArrowBar />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <style jsx>{`
        // .OrdersContainer {
        //   display: flex;
        //   flex-direction: column-reverse;
        // }

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
}
