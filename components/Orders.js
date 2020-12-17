import { styles } from "../public/js/styles";
import OrderEnd from "./OrderEnd";
import { FaCalendarAlt } from "react-icons/fa";
import ArrowBar from "./ArrowBar";
import ContentLoad from "./OrdersContentLoader";
import { useEffect, useState } from "react";

const OrderItem = ({ currentList }) => {
  const [hidden, setHidden] = useState(true);
  const dateChanger = (od) => {
    const date = new Date(od);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dt = date.getDate();
    const hours = date.getHours();
    const min = date.getMinutes();
    dt < 10 && (dt = "0" + dt);
    month < 10 && (month = "0" + month);
    hours < 10 && (hours = "0" + hours);
    min < 10 && (min = "0" + min);
    return hours + ":" + min + " / " + dt + "-" + month + "-" + year;
  };
  return (
    <>
      <div className="orderContainer">
        <div className="header" onClick={() => setHidden(!hidden)}>
          <div>
            <span className="label">
              <FaCalendarAlt /> تاريخ الطلب:
            </span>{" "}
            {dateChanger(currentList.date)}
          </div>

          <div className="totalbar">
            <span>
              <span className="label">الإجمالي: </span>
              {currentList.total} ل.ل
            </span>{" "}
            <span className="label">رقم الطلب: </span>
          </div>
        </div>

        {!hidden && (
          <>
            <OrderEnd proceedProducts={currentList.products} />
            <div className="footer">
              <span className="label">المراحل : </span>
              <div className="stepContainer">
                <ArrowBar progress={currentList.progress} />
              </div>
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

        .footer div {
          flex: 1 0 46rem;
        }

        .footer span {
          flex: 1 0 5rem;
        }

        .stepContainer {
          flex: 1 0 56rem;
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
};

export default function Orders({ current, orderList }) {
  const [currentList, setCurrentList] = useState([]);

  useEffect(() => {
    setCurrentList([]);
    current
      ? setCurrentList(
          orderList.filter(
            (obj) =>
              obj.progress.cancelation.done === !current &&
              obj.progress.arrive.done === !current
          )
        )
      : setCurrentList(
          orderList.filter(
            (obj) =>
              obj.progress.arrive.done === current ||
              obj.progress.cancelation.done === current
          )
        );
  }, [orderList, current]);

  return (
    <>
      {orderList.length === 0 ? (
        <ContentLoad />
      ) : (
        <>
          {currentList.map((obj, index) => (
            <OrderItem key={index} currentList={obj} />
          ))}
        </>
      )}
    </>
  );
}
