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
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          overflow: auto;
          width: 100%;
        }
        .footer div {
          -webkit-box-flex: 1;
          -ms-flex: 1 0 46rem;
          flex: 1 0 46rem;
        }
        .footer span {
          -webkit-box-flex: 1;
          -ms-flex: 1 0 5rem;
          flex: 1 0 5rem;
        }
        .stepContainer {
          -webkit-box-flex: 1;
          -ms-flex: 1 0 56rem;
          flex: 1 0 56rem;
        }
        .totalbar {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
        }
        .totalbar span {
          -webkit-box-flex: 1;
          -ms-flex: 1 1 100%;
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
      {currentList.length === 0 ? (
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
