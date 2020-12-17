import { useState } from "react";
import { styles } from "../../../public/js/styles";
import OrderEnd from "../../../components/OrderEnd";
import { FaCalendarAlt, FaMapMarkedAlt } from "react-icons/fa";
import OrderControll from "./OrderControll";

export default function OrderItem({ order, role, current, handleRemove }) {
  const [hidden, setHidden] = useState(true);
  const dateChanger = (od) => {
    const date = new Date(od);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dt = date.getDate();
    const hours = date.getHours();
    const minute = date.getMinutes();
    const day = dt < 10 ? "0" + dt : dt;
    const mon = month < 10 ? "0" + month : month;
    const hou = hours < 10 ? "0" + hours : hours;
    const min = minute < 10 ? "0" + minute : minute;

    return hou + ":" + min + " / " + day + "-" + mon + "-" + year;
  };

  return (
    <>
      <div className="orderContainer">
        <div className="header" onClick={() => setHidden(!hidden)}>
          <div>
            <span className="label">
              <FaCalendarAlt /> تاريخ الطلب:{" "}
            </span>
            {dateChanger(order.date)}
          </div>
          {!hidden && (
            <>
              <div className="totalbar">
                <span>
                  <span className="label">الإجمالي:</span> {order.total} ل.ل
                </span>{" "}
                <span>
                  <span className="label">رقم الطلب:</span> {order.orderCode}
                </span>
              </div>

              <div>
                <span className="label">
                  <FaMapMarkedAlt /> العنوان:
                </span>{" "}
                {order.address}
              </div>

              <div className="totalbar">
                <span>
                  <span className="label">اسم الزبون:</span> {order.userName}
                </span>

                <span>
                  <span className="label">الرقم:</span> {order.number}
                </span>
              </div>
            </>
          )}
        </div>

        {!hidden && (
          <>
            <OrderEnd proceedProducts={order.products} />

            <div className="footer">
              <OrderControll
                role={role}
                id={order._id}
                current={current}
                handleRemove={handleRemove.bind(this)}
              />
            </div>
          </>
        )}
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

        .stepContainer {
          flex: 1 0 56rem;
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

        .label {
          color: ${styles.secondaryColor};
        }
      `}</style>
    </>
  );
}
