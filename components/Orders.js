import { styles } from "../public/js/styles";
import OrderEnd from "./OrderEnd";

export default function Orders({ current, orderList }) {
  return (
    <>
      {current ? (
        <div className="orderContainer">
          {orderList.map((obj) => (
            <>
              <div className="header">
                <div>تاريخ الطلب: {obj.date}</div>
                <div>الإجمالي: {obj.total} ل.ل</div>
                <div>رقم الطلب: </div>
              </div>
              <OrderEnd proceedProducts={obj.products} />
              <div className="footer">مراحل الطلبية:</div>
            </>
          ))}
        </div>
      ) : (
        <div>past</div>
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
      `}</style>
    </>
  );
}
