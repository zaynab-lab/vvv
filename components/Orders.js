import { styles } from "../public/js/styles";
import OrderEnd from "./OrderEnd";
import { FaCalendarAlt } from "react-icons/fa";
import ArrowBar from "./ArrowBar";

export default function Orders({ current, orderList }) {
  return (
    <>
      {current ? (
        <>
          {" "}
          {orderList.map((obj) => (
            <div className="orderContainer">
              <div className="header">
                <div>
                  <span className="label">
                    <FaCalendarAlt /> تاريخ الطلب:
                  </span>{" "}
                  {obj.date}
                </div>
                <div className="totalbar">
                  <span>
                    <span className="label">الإجمالي: </span>
                    {obj.total} ل.ل
                  </span>{" "}
                  <span className="label">رقم الطلب: </span>
                </div>
              </div>
              <OrderEnd proceedProducts={obj.products} />
              <div className="footer">
                <span className="label">المراحل : </span>
                <div className="stepContainer">
                  <ArrowBar progress={obj.progress} />
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div></div>
      )}
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
}
