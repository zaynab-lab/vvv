import { useState } from "react";
import { styles } from "../../../public/js/styles";
import OrderEnd from "../../../components/OrderEnd";
import ArrowBar from "../../ArrowBar";
import { FaCalendarAlt, FaMapMarkedAlt } from "react-icons/fa";
import OrderControllBar from "./OrderControllBar";

export default function OrderItem({ order }) {
  const [hidden, setHidden] = useState(true);

  return (
    <>
      <div className="orderContainer">
        <div className="header" onClick={() => setHidden(!hidden)}>
          <div>
            <span className="label">
              <FaCalendarAlt /> تاريخ الطلب:{" "}
            </span>

            {order.date}
          </div>

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
        </div>

        {!hidden && <OrderEnd proceedProducts={order.products} />}

        <OrderControllBar />

        <div className="footer">
          <span className="label">المراحل : </span>

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

        .label {
          color: ${styles.secondaryColor};
        }
      `}</style>
    </>
  );
}
